const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();
  getAllPosts = async () => {
    const allPosts = await this.postRepository.getAllPosts();
    return allPosts;
  };
  getMyPosts = async (userId) => {
    const allMyPosts = await this.postRepository.getMyPosts(userId);
    return allMyPosts;
  };
  postCreate = async (payload) => {
    await this.postRepository.postCreate(payload);
  };

  postModify = async (payload) => {
    await this.postRepository.postModify(payload);
  };

  getPostInfo = async (postId) => {
    const result = await this.postRepository.getPostInfo(postId);
    return result;
  };

  deletePost = async (postId) => {
    await this.postRepository.deletePost(postId);
  };
}

module.exports = PostService;
