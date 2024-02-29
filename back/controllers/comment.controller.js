const CommentService = require("../services/comment.service");
const PostService = require("../services/post.service");
class CommentController {
  postService = new PostService();
  commentService = new CommentService();
  // 나의 댓글 모두 조회
  myComments = async (req, res) => {
    try {
      const { id } = res.locals.user;
      const myComments = await this.commentService.myComments(id);
      return res.status(200).json({ datas: myComments });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 해당 게시물의 댓글들을 조회
  postsComments = async (req, res) => {
    console.log("postsComments");
    try {
      const { postId } = req.params;
      // 게시물이 있는지 확인
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }
      const comments = await this.commentService.postsComments(postId);
      if (comments.length === 0) {
        return res.status(200).send({ message: "첫 댓글을 남겨주세요" });
      }
      return res.status(200).json({ datas: comments });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  // 댓글생성
  commentCreate = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;
      const { content, name } = req.body;
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
        name,
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
  commentModify = async (req, res) => {
    try {
      const { commentId, postId } = req.params;
      const { content } = req.body;
      const { id } = res.locals.user;
      const comment = await this.commentService.getComment(commentId);
      if (comment.userId !== id) {
        return res
          .status(412)
          .send({ message: "댓글을 수정할 권한이 없습니다." });
      }
      // 게시물이 있는지 확인
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }

      const payload = {
        commentId,
        content,
      };
      await this.commentService.commentModify(payload);
      return res.status(200).send({ message: "댓글이 수정되었습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  // 댓글삭제
  commentDelete = async (req, res) => {
    try {
      const { commentId, postId } = req.params;
      // 자신의 댓글만 수정가능
      const { id } = res.locals.user;

      const comment = await this.commentService.getComment(commentId);
      if (comment.userId !== id) {
        return res
          .status(412)
          .send({ message: "댓글을 삭제할 권한이 없습니다." });
      }
      // 게시물이 있는지 확인
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }
      const payload = {
        commentId,
      };

      await this.commentService.commentDelete(payload);
      return res.status(200).send({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

module.exports = CommentController;
