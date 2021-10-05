export default class Api {
  constructor(objConfig) {
    this._token = objConfig.token;
    this._id = objConfig.id;
    this._adress = objConfig.adress;
  }

  _verifyResolve(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  searchUserInfo() {
    return fetch(`https://${this._adress}/v1/${this._id}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._verifyResolve)
  }

  searchPosts() {
    return fetch(`https://${this._adress}/v1/${this._id}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._verifyResolve)
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
      .then(this._verifyResolve)
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
      .then(this._verifyResolve)
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
      .then(this._verifyResolve)
  }

  postDeletePost(postId) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards/${postId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._verifyResolve)
  }

  postLikePost(postId) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards/likes/${postId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._verifyResolve)
  }

  postDelLikePost(postId) {
    return fetch(`https://${this._adress}/v1/${this._id}/cards/likes/${postId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._verifyResolve)
  }
}