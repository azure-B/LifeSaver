const models = require("../models");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  // 전체 게시물 조회 (페이징 처리)
  GetPosts: async (req, res) => {
    const limit = 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = (page - 1) * limit;

    const result = await models.db.posts.findAll({
      attributes: ["id", "title", "content", "created_at", "updated_at"],
      include: [
        {
          model: models.db.users,
          attributes: ["id", "name"],
          as: "user",
        },
      ],
      order: [["id", "DESC"]],
      offset: offset,
      limit: limit,
      raw: true,
    });
    const posts = result.map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: moment(post.created_at).format("YYYY.MM.DD"),
        updatedAt: moment(post.updated_at).format("YYYY.MM.DD"),
        name: post["user.name"],
      };
    });
    return res.send({ posts });
  },
  
  // 개별 게시물 조회
  GetPost: async (req, res) => {
    const postId = req.params.id;
    const userSession = req.session.user ? req.session.user : null;
    let userId = null;
    let isAuthor = false;
    const result = await models.db.posts.findOne({
      where: { id: postId },
      attributes: ["id", "title", "content", "created_at", "updated_at"],
      include: [
        {
          model: models.db.users,
          attributes: ["id", "name"],
          as: "user",
        },
        {
          model: models.db.images,
          attributes: ["id", "url"],
          as: "images",
        },
      ],
    });
    const post = {
      id: result.id,
      title: result.title,
      content: result.content,
      createdAt: moment(result.created_at).format("YYYY.MM.DD"),
      updatedAt: moment(result.updated_at).format("YYYY.MM.DD"),
      user: {
        id: result.user.id,
        name: result.user.name,
      },
      images: result.images,
    };
    if (userSession) {
      // 해당 게시물 작성자인지 판별
      userId = userSession.id;
      isAuthor = post.user.id === userId ? true : false;
    }
    if (!post) {
      return res.status(404).send("존재하지 않는 질문입니다.");
    }
    return res.send({ isAuthor, post });
  },
  // 게시물 등록
  PostPost: async (req, res) => {
    const userSession = req.session.user ? req.session.user : null;
    let userId = null;
    if (userSession) {
      userId = userSession.id;
    } else {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const t = await models.sequelize.transaction();

    try {
      let { title, content } = req.body;
      title = title ? title : "제보합니다.";
      if (!content) {
        return res.status(500).send("내용을 입력해주세요!");
      }
      const newPost = await models.db.posts.create(
        {
          title,
          content,
          user_id: userId,
        },
        { transaction: t }
      );

      //첨부파일
      if (req.files && req.files.length > 0) {
        const filePromises = req.files.map(async (file) => {
          const fileData = {
            url: file.location,
            post_id: newPost.id,
          };
          await models.db.images.create(fileData, { transaction: t });
        });

        await Promise.all(filePromises);
      }
      await t.commit();
      const result = {
        postId: newPost.id,
        message: "게시물이 정상적으로 등록되었습니다",
      };
      return res.status(201).send(result);
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).send("서버 오류");
    }
  },

  // 게시물 수정
  PatchPost: async (req, res) => {
    const t = await models.sequelize.transaction();
    try {
      const postId = req.params.id;
      const { title, content } = req.body;

      // 게시물 작성자인지 판별한다
      const userSession = req.session.user ? req.session.user : null;
      let userId = null;
      let isAuthor = false;
      const existingPost = await models.db.posts.findByPk(postId);

      if (!existingPost) {
        await t.rollback();
        return res.status(404).send("존재하지 않는 게시물입니다.");
      }

      if (userSession) {
        userId = userSession.id;
        isAuthor = existingPost.user_id === userId ? true : false;
      } else {
        return res.status(401).send("로그인이 필요합니다.");
      }

      if (!isAuthor) {
        return res.status(403).send("권한이 없습니다.");
      }

      // 이전파일 삭제
      const existingFiles = await models.db.images.findAll({
        where: { post_id: existingPost.id },
        transaction: t,
      });

      const fileDeletionPromises = existingFiles.map(async (file) => {
        await fs.unlink(file.url);
        await models.db.images.destroy({
          where: { id: file.id },
          transaction: t,
        });
      });
      await Promise.all(fileDeletionPromises);

      // 게시물 업데이트
      await existingPost.update(
        {
          title,
          content,
        },
        { transaction: t } // 트랜잭션 지정
      );

      // 첨부 파일 수정
      if (req.files && req.files.length > 0) {
        // 새 첨부파일 업로드
        const filePromises = req.files.map(async (file) => {
          const fileData = {
            url: file.path + "/" + file.originalname,
            post_id: existingPost.id,
          };
          await models.db.images.create(fileData, { transaction: t });
        });

        await Promise.all(filePromises); // 병렬 처리
      }

      await t.commit();

      return res.status(200).send("게시물이 수정되었습니다.");
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).send("서버 오류");
    }
  },
  // 게시물 삭제
  DeletePost: async (req, res) => {
    const t = await models.sequelize.transaction();
    try {
      const postId = req.params.id;
      const existingPost = await models.db.posts.findByPk(postId);
      // 게시물 작성자인지 판별한다
      const userSession = req.session.user ? req.session.user : null;
      let userId = null;
      let isAuthor = false;

      if (userSession) {
        userId = userSession.id;
        isAuthor = existingPost.user_id === userId ? true : false;
      } else {
        return res.status(401).send("로그인이 필요합니다.");
      }

      if (!isAuthor) {
        return res.status(403).send("권한이 없습니다.");
      }

      if (!existingPost) {
        await t.rollback();
        return res.status(404).send("존재하지 않는 게시물입니다.");
      }

      // 첨부 파일 삭제
      const existingFiles = await models.db.images.findAll({
        where: { post_id: existingPost.id },
        transaction: t,
      });

      const fileDeletionPromises = existingFiles.map(async (file) => {
        const filePath = path.join(__dirname, "../", file.url);
        await fs.promises.unlink(filePath);
        await models.db.images.destroy({
          where: { id: file.id },
          transaction: t,
        });
      });

      await Promise.all(fileDeletionPromises);

      // 게시물 삭제
      await existingPost.destroy({ transaction: t });

      await t.commit();

      return res.status(200).send("게시물이 삭제되었습니다.");
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).send("서버 오류");
    }
  },
};
