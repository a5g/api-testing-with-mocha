import Base from './Base'
import API from './API'
const globals = require('../../config/globals')

const api = new API()
const headers = {
  'Content-type': 'application/json; charset=UTF-8',
}

export default class PostsAPI extends Base {
  getAllPosts() {
    const options = {
      url: `${globals.baseURL}/posts`,
      headers,
    }

    return api.get(options)
  }

  getPostById(id = 1) {
    const options = {
      url: `${globals.baseURL}/posts/${id}`,
      headers,
    }

    return api.get(options)
  }

  createPost(body) {
    const options = {
      url: `${globals.baseURL}/posts`,
      headers,
      body,
    }

    return api.post(options)
  }

  updatePost(body) {
    const options = {
      url: `${globals.baseURL}/posts/${body.id}`,
      headers,
      body,
    }

    return api.put(options)
  }

  updatePostAttribute(id, body) {
    const options = {
      url: `${globals.baseURL}/posts/${id}`,
      headers,
      body,
    }

    return api.patch(options)
  }

  deletePost(id) {
    const options = {
      url: `${globals.baseURL}/posts/${id}`,
      headers,
    }

    return api.delete(options)
  }
}
