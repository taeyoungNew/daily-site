const saveUserInfo = (value) => {
  const userInfo = value.UserInfo;
  const email = value.email;
  for (let key in userInfo) {
    console.log(key, userInfo[key]);
    document.cookie = `${key}=${userInfo[key]}`;
  }
  document.cookie = `user_email=${email}`;
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

const getUserMbti = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)mbti\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};
const getUserAge = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)age\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getUserAboutMe = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)aboutMe\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getUserFood = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)food\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getUserHobby = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)hobby\s*=\s*([^;]*).*$)|^.*$/,
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
  saveUserInfo,
  getUserEmail,
  getUserName,
  getUserMbti,
  getUserAge,
  getUserAboutMe,
  getUserFood,
  getUserHobby,
  getUserProfileImg,
  getUserAddress,
};
