import Base from './Base'
import API from './API'
const globals = require('../../config/globals')

const api = new API()
const headers = {
  'Content-type': 'application/json; charset=UTF-8',
}

export default class CommentsAPI extends Base {
  getAllComments() {
    const options = {
      url: `${globals.baseURL}/comments`,
      headers,
    }

    return api.get(options)
  }

  getCommentById(id = 1) {
    const options = {
      url: `${globals.baseURL}/comments/${id}`,
      headers,
    }

    return api.get(options)
  }
}
