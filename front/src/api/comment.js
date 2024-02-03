import axios from "axios";
export default class CommentApi {
  createComment = async (payload) => {
    return await axios.post(
      `http://localhost:3000/api/comment/${payload.postId}`,
      { content: payload.comment, name: payload.name },
      {
        withCredentials: true,
      }
    );
  };
  loadComments = async (postId) => {
    console.log("loadComments = ", postId);
    return await axios.get(
      `http://localhost:3000/api/comment/post-comments/${postId}`
    );
  };
  modifyComment = async (payload) => {
    const { postId, commentId, content } = payload;
    return await axios.put(
      `http://localhost:3000/api/comment/${postId}/${commentId}`,
      { content },
      {
        withCredentials: true,
      }
    );
  };
  deleteComment = async (payload) => {
    const { postId, commentId } = payload;
    return await axios.delete(
      `http://localhost:3000/api/comment/${postId}/${commentId}`,
      {
        withCredentials: true,
      }
    );
  };
}
