import axios from "axios";
export default class PostApi {
  loadPosts = async (lastId) => {
    return await axios.get(
      `http://localhost:3000/api/post?lastId=${lastId}&limit=5`
    );
  };

  loadMyPosts = async (lastId) => {
    return await axios.get(
      `http://localhost:3000/api/post/my-posts?lastId=${lastId}&limit=5`,
      {
        withCredentials: true, // axios는 withCredentials를 true로 하지 않으면 토큰을 저장안함
      }
    );
  };

  createPost = async (payload) => {
    return await axios.post(`http://localhost:3000/api/post/`, payload, {
      withCredentials: true, // axios는 withCredentials를 true로 하지 않으면 토큰을 저장안함
    });
  };
}
