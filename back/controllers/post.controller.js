const PostService = require("../services/post.service");
class PostController {
  postService = new PostService();
  getPosts = () => {};

  // 게시물 생성
  postCreate = async (req, res) => {
    try {
      const { title, content, img } = req.body;
      const { id } = res.locals.user;
      console.log(id, title, content, img);
      // 제목이 공백이면 에러처리
      // 내용이 공백이면 에러처리

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

  postModify = () => {};

  postDelete = () => {};
}

module.exports = PostController;
