const { Post } = require("../models");

class PostRepository {
  postCreate = async (payload) => {
    const { id, title, content, img } = payload;
    console.log(id, title, content, img);
    await Post.create({
      userId: id,
      title,
      content,
      img,
    });
  };
}

module.exports = PostRepository;
