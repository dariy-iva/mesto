export default class UserInfo {
  constructor({ userNameProfileSelector, userAboutMeSelector }) {
    this._userNameElement = document.querySelector(userNameProfileSelector);
    this._userAboutMeElement = document.querySelector(userAboutMeSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userNameElement.textContent;
    this._userInfo.aboutMe = this._userAboutMeElement.textContent;

    return this._userInfo;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutMeElement.textContent = data.aboutMe;
  }
}