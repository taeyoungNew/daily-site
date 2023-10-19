const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  // 나의 댓글 모두 조회
  myComments = () => {};
  // 해당 게시물의 댓글 조회
  postsComments = () => {};
  // 댓글하나의 조회
  getComment = async (commentId) => {
    const comment = await this.commentRepository.getComment(commentId);
    return comment;
  };
  // 댓글생성
  commentCreate = async (payload) => {
    await this.commentRepository.commentCreate(payload);
  };

  // 댓글수정
  commentModify = () => {};

  // 댓글삭제
  commentDelete = () => {};
}

module.exports = CommentService;
