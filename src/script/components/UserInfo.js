export default class UserInfo {
  constructor( objConfig ) {
    this._userNameElement = document.querySelector(objConfig.userNameProfileSelector);
    this._userAboutMeElement = document.querySelector(objConfig.userAboutMeSelector);
    this._userAvatarElement = document.querySelector(objConfig.userAvatarSelector);
    this._userInfo = {};
  }

  getUserInfo() {
    this._userInfo.name = this._userNameElement.textContent;
    this._userInfo.about = this._userAboutMeElement.textContent;

    return this._userInfo;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutMeElement.textContent = data.about;
    this._userInfo.id = data._id;
  }

  setUserAvatar(data) {
    this._userAvatarElement.src = data.avatar;
  }
}