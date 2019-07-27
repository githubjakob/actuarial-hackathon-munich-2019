const absKeys = require('./keys.js')

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {}
  }

  setup(app) {
    this.app = app
  }

  async find(params) {
    const { query } = params

    const dataModel = this.app.service('data').Model

    // const match = {
    //   createdAt: {
    //     $gte: new Date(query.dateRange.from),
    //     $lte: new Date(query.dateRange.to)
    //   }
    // }

    const match = query

    const sumObj = {}
    absKeys.forEach(key => {
      sumObj[key] = { $sum: `$${key}` }
    })

    const [aggregation] = await dataModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          ...sumObj
        }
      }
    ])

    return aggregation
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
