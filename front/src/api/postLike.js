import axios from "axios";
export default class PostLike {
  likePost = async (postId) => {
    console.log(postId);
    await axios.post(
      `http://localhost:3000/api/postLike/${postId}`,
      {}, // POST메소드의 두번째인자는 BODY값으로 withCredentials는 반드시 세번째 인자에 넣자...
      {
        withCredentials: true,
      }
    );
  };
}
