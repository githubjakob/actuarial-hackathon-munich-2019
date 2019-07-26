const axios = require('axios')

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {}
  }

  setup(app) {
    this.app = app
    this.url = 'http://localhost:81'
  }

  async find(params) {
    const { query } = params
    console.log('query: ', query)
    const url = `${this.url}/hello`
    const reqBody = {
      method: 'get',
      url,
      // params: { fromEngine: 'Hi from engine' }
      params: query
    }
    const res = await axios(reqBody)
    return res.data
  }

  async get(id, params) {
    return null
  }

  async create(data, params) {
    return null
  }

  async update(id, data, params) {
    return null
  }

  async patch(id, data, params) {
    return null
  }

  async remove(id, params) {
    return null
  }
}

module.exports = function(options) {
  return new Service(options)
}

module.exports.Service = Service
