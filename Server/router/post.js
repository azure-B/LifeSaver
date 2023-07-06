const express = require("express");
const router = express.Router();
const controller = require("../controller/post");
const { upload } = require("../config/upload");

// /api/posts
router.get("/", controller.GetPosts);
router.get("/:id", controller.GetPost);
router.post("/", upload.array("files", 10), controller.PostPost);
router.patch("/:id", upload.array("files", 10), controller.PatchPost);
router.delete("/:id", controller.DeletePost);

module.exports = router;
