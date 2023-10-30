const { Comment } = require("../models");
class CommentRepository {
  // 해당 댓글 조회
  getComment = async (commentId) => {
    const comment = await Comment.findOne({ where: { id: commentId } });
    return comment;
  };
  // 나의 댓글 모두 조회
  myComments = async (userId) => {
    const myComments = await Comment.findAll({ where: { userId } });
    return myComments;
  };
  // 해당 게시물의 댓글들을 조회
  postsComments = async (postId) => {
    const comments = await Comment.findAll({ where: { postId: postId } });
    console.log("comments", comments);
    return comments;
  };
  // 댓글생성
  commentCreate = async (payload) => {
    const { id, postId, content } = payload;
    await Comment.create({ userId: id, postId, content });
  };

  // 댓글수정
  commentModify = async (payload) => {
    const { commentId, content } = payload;
    await Comment.update({ content }, { where: { id: commentId } });
  };

  // 댓글삭제
  commentDelete = async (payload) => {
    const { commentId } = payload;
    await Comment.destroy({ where: { id: commentId } });
  };
}

module.exports = CommentRepository;
