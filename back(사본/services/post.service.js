const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();
  getAllPosts = async (poastLastId, limit) => {
    const allPosts = await this.postRepository.getAllPosts(poastLastId, limit);
    return allPosts;
  };
  getMyPosts = async (payload) => {
    const allMyPosts = await this.postRepository.getMyPosts(payload);
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
