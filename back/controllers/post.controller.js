const PostService = require("../services/post.service");
class PostController {
  postService = new PostService();

  // 전체 최신순으로 게시물 조회
  getAllPosts = async (req, res) => {
    try {
      const allPosts = await this.postService.getAllPosts();
      return res.status(200).json({ datas: allPosts });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 나의 게시물만 조회
  getMyPosts = async (req, res) => {
    try {
      const { id } = res.locals.user;
      const allMyPosts = await this.postService.getAllPosts(id);
      return res.status(200).json({ datas: allMyPosts });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  // 게시물 생성
  postCreate = async (req, res) => {
    try {
      const { title, content, img } = req.body;
      const { id } = res.locals.user;
      // 제목과 내용이 공백이면 에러처리
      if (!title) {
        return res.status(412).send({ message: "제목을 입력해주세요" });
      }
      if (!content) {
        return res.status(412).send({ message: "게시물내용을 입력해주세요." });
      }

      const payload = {
        id,
        title,
        content,
        img,
      };
      await this.postService.postCreate(payload);
      return res.status(201).send({ message: "게시물이 생성되었습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  // 게시물 수정
  postModify = async (req, res) => {
    try {
      const { title, content, img } = req.body;
      const { postId } = req.params;
      const { id } = res.locals.user;
      // 자신의 게시물만 수정가능
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }
      if (getPost.userId !== id) {
        return res
          .status(412)
          .send({ message: "자신의 게시물만 수정할 수 있습니다." });
      }
      // 제목과 내용이 공백이면 에러처리
      if (!title) {
        return res.status(412).send({ message: "수정할 제목을 입력해주세요" });
      }
      if (!content) {
        return res
          .status(412)
          .send({ message: "수정할 게시물내용을 입력해주세요." });
      }

      const payload = {
        postId,
        title,
        content,
        img,
      };
      await this.postService.postModify(payload);
      return res.status(200).send({ message: "게시물이 수정되었습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 게시물 삭제
  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;
      // 자신의 게시물만 수정가능
      const getPost = await this.postService.getPostInfo(postId);
      console.log("getPost = ", getPost);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }
      if (getPost.userId !== id) {
        return res
          .status(412)
          .send({ message: "자신의 게시물만 수정할 수 있습니다." });
      }

      await this.postService.deletePost(postId);
      return res.status(200).send({ message: "게시물이 삭제되엇습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

module.exports = PostController;
