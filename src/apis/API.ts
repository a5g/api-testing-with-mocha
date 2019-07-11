const request = require('request-promise')

export default class API {
  send(options) {
    let opts = Object.assign({}, options)
    opts.resolveWithFullResponse = true
    opts.json = true

    return request(opts)
      .then(function(response) {
        return response
      })
      .catch(function(err) {
        // API call failed...
        // console.log(`Request failed due to: ${err}`)
        return err
      })
  }

  get(options) {
    // console.log(`making a GET request:`)
    let opts = Object.assign({}, options)
    opts.method = 'GET'
    return this.send(opts)
  }

  post(options) {
    // console.log(`making a POST request:`)
    let opts = Object.assign({}, options)
    opts.method = 'POST'
    return this.send(opts)
  }

  put(options) {
    // console.log(`making a PUT request:`)
    let opts = Object.assign({}, options)
    opts.method = 'PUT'
    return this.send(opts)
  }

  patch(options) {
    // console.log(`making a PUT request:`)
    let opts = Object.assign({}, options)
    opts.method = 'PATCH'
    return this.send(opts)
  }

  delete(options) {
    // console.log(`making a DELETE request:`)
    let opts = Object.assign({}, options)
    opts.method = 'DELETE'
    return this.send(opts)
  }
}
