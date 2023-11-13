import axios from "axios";
// 게시물 생성
const createPost = (payload) => {
  axios
    .post("http ://0.0.0.0:3000/api/post/", payload)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 게시물 수정

// 게시물 전체조회

// 게시물 조회
const getPosts = () => {
  axios
    .get("http://0.0.0.0:3000/api/post")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 게시물 삭제

export { getPosts, createPost };
