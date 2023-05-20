class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseApi(res) {
    if (!res.ok) {
      return res.text().then(text => { throw Error(text) });
    } else {
      return res.json();
    }
  }

  signup( password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, name })
    })
      .then(res => this._getResponseApi(res));
  }

  signin(password, name) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, name })
    })
      .then(res => this._getResponseApi(res));
  };

  getOut = () => {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseApi(res));
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

  updatePost(post) {console.log(post)
    return fetch(`${this._baseUrl}/post`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(post)
    })
      .then(res => this._getResponseApi(res));
  }

  getPosts(id) {
    return fetch(`${this._baseUrl}/posts/${id}`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

  getCount() {
    return fetch(`${this._baseUrl}/count`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

  setNewPost(postData) {
    return fetch(`${this._baseUrl}/post`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(postData)
    })
      .then(res => this._getResponseApi(res));
  }

  getPostById(id) {
    return fetch(`${this._baseUrl}/post/${id}`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

  deletePost(id) {console.log(id,'main')
    return fetch(`${this._baseUrl}/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

}

export const mainApi = new MainApi({
  baseUrl: 'https://api.1domkinotv.ru',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});