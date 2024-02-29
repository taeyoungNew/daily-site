const { Post, PostLike, Comment, sequelize } = require("../models");
const Sequelize = require("sequelize");
class PostRepository {
  getAllPosts = async (lastId, paramLimit) => {
    let where = 0;
    const limit = parseInt(paramLimit, 10);

    const orderColumn = "post.createdAt";
    const order = "DESC";
    let query = ``;
    try {
      if (parseInt(lastId, 10)) {
        where = lastId;
        query = `SELECT post.id, post.userId, post.userName, post.content, postLike.likeCnt, comment.commentCnt, post.createdAt
                         FROM (
                          SELECT post.id, post.userId, post.userName, post.content, post.createdAt
                            FROM Posts post
                          GROUP BY post.id
                        ) post
                        LEFT JOIN (
                          SELECT postLike.postId, COUNT(postLike.postId) as likeCnt 
                            FROM PostLikes postLike
                          GROUP BY postLike.postId
                        ) postLike 
                          ON post.id = postLike.postId
                        LEFT JOIN (
                          SELECT comment.postId, COUNT(comment.postId) as commentCnt
                            FROM Comments comment
                          GROUP BY comment.postId
                        ) comment
                        ON post.id = comment.postId
                        WHERE post.id < ${where}
                        ORDER BY ${orderColumn} ${order}
                        LIMIT ${limit}
                      `;
      } else {
        query = `SELECT post.id, post.userId, post.userName, post.content, postLike.likeCnt, comment.commentCnt, post.createdAt
                         FROM (
                          SELECT post.id, post.userId, post.userName, post.content, post.createdAt
                            FROM Posts post
                          GROUP BY post.id
                        ) post
                        LEFT JOIN (
                          SELECT postLike.postId, COUNT(postLike.postId) as likeCnt 
                            FROM PostLikes postLike
                          GROUP BY postLike.postId
                        ) postLike 
                          ON post.id = postLike.postId
                        LEFT JOIN (
                          SELECT comment.postId, COUNT(comment.postId) as commentCnt
                            FROM Comments comment
                          GROUP BY comment.postId
                        ) comment
                        ON post.id = comment.postId
                        ORDER BY ${orderColumn} ${order}
                        LIMIT ${limit}
                      `;
      }
      // 게시물과 좋아요갯수 댓글갯수구하기

      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const allPosts = await Post.findAll({
    //     attributes: ["id", "userId", "userName", "content", "createdAt"],
    //     include: [
    //       {
    //         model: PostLike,
    //         // as: "postLike",
    //         attributes: [
    //           [
    //             Sequelize.fn("COUNT", Sequelize.col("PostLikes.postId")),
    //             "likeCount",
    //           ],
    //         ],
    //       },
    //       {
    //         model: Comment,
    //         // as: "comment",
    //         attributes: [
    //           [
    //             Sequelize.fn("COUNT", Sequelize.col("Comments.postId")),
    //             "commentsCount",
    //           ],
    //         ],
    //       },
    //     ],
    //     limit: 5,
    //     where,
    //     order: [["createdAt", "DESC"]],
    //     group: ["id", "PostLikes.postId", "Comments.postId"],
    //   });
    //   return allPosts;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  getMyPosts = async (payload) => {
    const Op = Sequelize.Op;
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
