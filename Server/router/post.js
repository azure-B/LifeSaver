const express = require("express");
const router = express.Router();
const controller = require("../controller/post");
const multer = require("multer");
const path = require("path");

// TODO: S3와 연결 필요
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images/")); // 상위 디렉토리로 이동하여 저장
  },
  filename: function (req, file, cb) {
    // 한글 처리
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});
const upload = multer({ storage: storage });

// /api/posts
router.get("/", controller.GetPosts);
router.get("/:id", controller.GetPost);
router.post("/", upload.array("files", 10), controller.PostPost);
router.patch("/:id", upload.array("files", 10), controller.PatchPost);
router.delete("/:id", controller.DeletePost);

module.exports = router;
