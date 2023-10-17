const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();
  postCreate = async (payload) => {
    console.log(payload);
    await this.postRepository.postCreate(payload);
  };
}

module.exports = PostService;
