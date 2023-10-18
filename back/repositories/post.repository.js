const { Post } = require("../models");

class PostRepository {
  getAllPosts = async () => {
    const allPosts = await Post.findAll({
      attributes: ["id", "userId", "title", "content", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return allPosts;
  };
  getMyPosts = async (userId) => {
    const allMyPosts = await findAll({
      attributes: ["id", "userId", "title", "content", "createdAt"],
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    return allMyPosts;
  };
  postCreate = async (payload) => {
    const { id, title, content, img } = payload;
    await Post.create({
      userId: id,
      title,
      content,
      img,
    });
  };

  postModify = async (payload) => {
    const { postId, title, content, img } = payload;
    await Post.update(
      {
        title,
        content,
        img,
      },
      { where: { id: postId } }
    );
  };

  getPostInfo = async (postId) => {
    const postInfo = await Post.findOne({
      attributes: ["id", "userId"],
      where: { id: postId },
    });
    return postInfo;
  };

  deletePost = async (postId) => {
    const result = await Post.destroy({
      where: { id: postId },
    });
    console.log("deletePost = ", result);
  };
}

module.exports = PostRepository;
