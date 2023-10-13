const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();
}

module.exports = PostService;
