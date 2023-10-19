const { Comment } = require("../models");
class CommentRepository {
  // 나의 댓글 모두 조회
  myComments = () => {};
  // 해당 게시물의 댓글 조회
  postsComments = () => {};
  // 댓글생성
  commentCreate = async (payload) => {
    const { id, postId, content } = payload;
    await Comment.create({ userId: id, postId, content });
  };

  // 댓글수정
  commentModify = () => {};

  // 댓글삭제
  commentDelete = () => {};
}

module.exports = CommentRepository;
