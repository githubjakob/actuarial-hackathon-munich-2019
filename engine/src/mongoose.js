const mongoose = require('mongoose')

let retries = 0

module.exports = function connectToMongoDb(app) {
  // prevent mongoose from adding an 's' to the collection name
  mongoose
    .connect(app.get('mongodb'), { useNewUrlParser: true })
    .then(() => {
      console.log('mongodb connected')
      retries = 0
    })
    .catch(err => {
      console.log('error connecting to mongo: ', err)
      setTimeout(() => {
        console.log('trying to reconnect to mongodb')
        connectToMongoDb(app)
      }, ++retries * 1000)
    })
  mongoose.Promise = global.Promise
  app.set('mongooseClient', mongoose)
}

