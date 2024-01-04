import axios from "axios";
export default class CommentApi {
  createComment = async (payload) => {
    return await axios.post(
      `http://localhost:3000/api/comment/${payload.postId}`,
      { content: payload.comment },
      {
        withCredentials: true,
      }
    );
  };
}
