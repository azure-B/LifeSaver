const models = require("../models");
const multer = require("multer");
const fs = require("fs");

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
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        name: post["users.name"],
      };
    });
    return res.send({ posts });
  },
  // 개별 게시물 조회
  GetPost: async (req, res) => {
    // const userSession = req.session.user ? req.session.user : null;
    const postId = req.params.id;
    let userId = null;
    let isAuthor = false;

    // if (userSession) {
    //   userId = models.db.users.findOne({
    //     where: { email: userSession.email },
    //     attributes: ["id"],
    //   });
    //   // 해당 게시물 작성자인지 판별
    //   isAuthor = postId === userId ? true : false;
    // }

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
    if (!result) {
      return res.status(404).send("존재하지 않는 질문");
    }
    const resData = {
      isAuthor,
      data: result,
    };
    console.log(resData);
    return res.send({ resData });
  },
  // 게시물 등록
  PostPost: async (req, res) => {
    // TODO: 로그인 판별
    const t = await models.sequelize.transaction();

    try {
      const { title, content } = req.body;
      const userId = 1;

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
            url: file.path + "/" + file.originalname,
            post_id: newPost.id,
          };
          await models.db.images.create(fileData, { transaction: t });
        });

        await Promise.all(filePromises);
      }
      await t.commit();
      return res.status(201).send("게시물이 등록되었습니다.");
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).send("서버 오류");
    }
  },

  // 게시물 수정
  PatchPost: async (req, res) => {
    // TODO: 로그인 판별
    const t = await models.sequelize.transaction();
    try {
      const postId = req.params.id;
      const { title, content } = req.body;

      const existingPost = await models.db.posts.findByPk(postId, {
        transaction: t,
      });

      if (!existingPost) {
        await t.rollback();
        return res.status(404).send("존재하지 않는 게시물입니다.");
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

      const existingPost = await models.db.posts.findByPk(postId, {
        transaction: t,
      });

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
