import axios from "axios";
export default class PostApi {
  loadPosts = async () => {
    return await axios.get(`http://localhost:3000/api/post/`);
  };

  createPost = async (payload) => {
    return await axios.post(`http://localhost:3000/api/post/`, payload, {
      withCredentials: true, // axios는 withCredentials를 true로 하지 않으면 토큰을 저장안함
    });
  };
}
