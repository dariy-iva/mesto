export default class Api {
  constructor(objConfig) {
    this._token = objConfig.token;
    this._id = objConfig.id;
    this._adress = objConfig.adress;
  }

  searchUserInfo() {
    return fetch(`https://${this._adress}/v1/${this._id}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
  }

  searchPosts() {
    return fetch(`https://${this._adress}/v1/${this._id}/cards`, {
      headers: {
        authorization: this._token
      }
    })
  }

  postUserInfo(data) {
    return fetch(`https://${this._adress}/v1/${this._id}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  postUserAvatar(data) {
    return fetch(`https://${this._adress}/v1/${this._id}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

  postPost(data) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.mesto,
        link: data.link
      })
    })
  }

  postDeletePost(postId) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards/${postId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  }

  postLikePost(postId) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards/likes/${postId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
  }

  postDelLikePost(postId) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards/likes/${postId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  }
}