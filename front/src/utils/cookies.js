const saveUserInfo = (value) => {
  const userInfo = value.UserInfo;
  const email = value.email;
  for (let key in userInfo) {
    console.log(key, userInfo[key]);
    document.cookie = `${key}=${userInfo[key]}`;
  }
  document.cookie = `user_email=${email}`;
};

const saveAboutMe = (value) => {
  document.cookie = `my_aboutme=${value}`;
};
const saveMbti = (value) => {
  document.cookie = `my_mbti=${value}`;
};
const saveFood = (value) => {
  document.cookie = `my_food=${value}`;
};
const saveHobby = (value) => {
  document.cookie = `my_hobby=${value}`;
};

const getUserEmail = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_email\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getUserName = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)name\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getMyMbti = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)my_mbti\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};
const getUserAge = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)age\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getMyAboutMe = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)my_about_me\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getMyFood = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)my_food\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getMyHobby = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)my_hobby\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getUserProfileImg = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)profileImg\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getUserAddress = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)address\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

export {
  saveAboutMe,
  saveMbti,
  saveFood,
  saveHobby,
  saveUserInfo,
  getUserEmail,
  getUserName,
  getMyMbti,
  getUserAge,
  getMyAboutMe,
  getMyFood,
  getMyHobby,
  getUserProfileImg,
  getUserAddress,
};
