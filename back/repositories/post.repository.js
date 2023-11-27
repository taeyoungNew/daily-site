const { Post } = require("../models");

class PostRepository {
  getAllPosts = async () => {
    const allPosts = await Post.findAll({
      attributes: ["id", "userId", "userName", "content", "createdAt"],
      limit: 5,
      order: [["createdAt", "DESC"]],
    });
    return allPosts;
  };
  getMyPosts = async (userId) => {
    try {
      const allMyPosts = await Post.findAll({
        attributes: ["id", "userId", "userName", "content", "createdAt"],
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
      });
      return allMyPosts;
    } catch (error) {
      throw new Error(error);
    }
  };
  postCreate = async (payload) => {
    const { id, userName, content, img } = payload;
    await Post.create({
      userId: id,
      userName,
      content,
      img,
    });
  };

  postModify = async (payload) => {
    const { postId, content, img } = payload;
    await Post.update(
      {
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
