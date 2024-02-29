const { Post, PostLike, Comment } = require("../models");
const Sequelize = require("sequelize");
class PostRepository {
  getAllPosts = async (lastId, limit) => {
    const Op = Sequelize.Op;
    let where = {};

    if (parseInt(lastId, 10)) {
      where = {
        id: {
          // 라스트ID방식으로 가져오기
          [Op.lt]: lastId,
        },
      };
    }
    try {
      const allPosts = await Post.findAll({
        attributes: ["id", "userId", "userName", "content", "createdAt"],
        group: ["postId"],
        include: [
          { model: Comment, attributes: ["id", "content", "name"] },
          {
            model: PostLike,
            attributes: [
              Sequelize.fn("COUNT", Sequelize.col("PostLike.userId")),
              "likeCount",
            ],
          },
        ],
        where,
        order: [["createdAt", "DESC"]],
        limit: parseInt(limit, 10),
      });
      return allPosts;
    } catch (error) {
      console.log(error);
    }
  };

  getMyPosts = async (payload) => {
    const Op = Sequelize.Op;
    console.log(payload);
    const { id, postLastId, limit } = payload;
    // console.log(id, lastId, limit);
    let where = {};
    if (parseInt(postLastId, 10)) {
      where = {
        id: {
          [Op.lt]: postLastId,
        },
        userId: id,
      };
    } else {
      where = {
        userId: id,
      };
    }
    try {
      const allMyPosts = await Post.findAll({
        attributes: ["id", "userId", "userName", "content", "createdAt"],
        where,
        order: [["createdAt", "DESC"]],
        limit: parseInt(limit, 10),
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
