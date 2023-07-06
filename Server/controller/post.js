const models = require("../models");

module.exports = {
  GetPosts: async (req, res) => {
    const posts = await models.db.posts.findAll();
    return res.json({ posts });
  },
};
