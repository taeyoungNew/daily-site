const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  // 나의 댓글 모두 조회
  myComments = async (userId) => {
    const myComments = await this.commentRepository.myComments(userId);
    return myComments;
  };
  // 해당 게시물의 댓글 조회
  postsComments = async (postId) => {
    const comments = await this.commentRepository.postsComments(postId);
    return comments;
  };
  // 댓글하나를 조회
  getComment = async (commentId) => {
    const comment = await this.commentRepository.getComment(commentId);
    return comment;
  };
  // 댓글생성
  commentCreate = async (payload) => {
    await this.commentRepository.commentCreate(payload);
  };

  // 댓글수정
  commentModify = async (payload) => {
    await this.commentRepository.commentModify(payload);
  };

  // 댓글삭제
  commentDelete = async (payload) => {
    await this.commentRepository.commentDelete(payload);
  };
}

module.exports = CommentService;
