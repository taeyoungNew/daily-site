const CommentService = require("../services/comment.service");
const PostService = require("../services/post.service");
class CommentController {
  postService = new PostService();
  commentService = new CommentService();
  // 나의 댓글 모두 조회
  myComments = (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 해당 게시물의 댓글 조회
  postsComments = (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 댓글생성
  commentCreate = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;
      const { content } = req.body;
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }
      if (!content) {
        return res.status(412).send({ message: "댓글내용을 입력해주세요" });
      }
      const payload = {
        postId,
        id,
        content,
      };

      await this.commentService.commentCreate(payload);
      return res
        .status(201)
        .send({ message: "해당 게시물에 댓글을 생성했습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  // 댓글수정
  commentModify = (req, res) => {
    try {
      const { commentId } = req.params;
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  // 댓글삭제
  commentDelete = (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

module.exports = CommentController;
