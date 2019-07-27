const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./logger')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const mongoose = require('./mongoose')

const app = express(feathers())
const fs = require('fs')
const csv = require('fast-csv')
const { DateTime } = require('luxon')

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

app.configure(mongoose)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

// setTimeout(async () => {
//   await app
//     .service('math-server')
//     .find({ query: { fromEngine: 'Hi from engine' } })
// }, 1000)

setTimeout(async () => {
  try {

    const res = await app.service('aggregator').find({
      query: {
        // Geschlecht: 2,
        // Standort: { $in: ['Saarbrücken'] }
        // Alter: { $gt: 20, $lte: 30 }
        JahrZins: [
          { jahr: 2019, zins: 0.013 },
          { jahr: 2020, zins: 0.012 },
          { jahr: 2021, zins: 0.011 },
          { jahr: 2022, zins: 0.01 },
          { jahr: 2023, zins: 0.01 }
        ]
      }
    })
    console.log('res: ', JSON.stringify(res, null, 2))
  } catch (err) {
    console.log('err.message: ', err.message)
  }
}, 1000)

setTimeout(async () => {
  function convertDate(dateStr) {
    if (!dateStr) return null
    const dateArr = dateStr.split('.')
    const date = DateTime.fromObject({
      day: dateArr[0],
      month: dateArr[1],
      year: dateArr[2],
      hour: 12
    })
    return date.toJSDate()
  }
  try {
    const hasData = await app.service('data').find({ query: { $limit: 0 } })
    if (hasData.total > 0) return
    const today = DateTime.local()
    fs.createReadStream('daten2.csv')
      .pipe(csv.parse({ headers: true, delimiter: ';', encoding: 'utf8' }))
      .on('data', row => {
        row.Bestandsart = convertDate(row.Bestandsart)
        row['Eintritt/Rentenbeginn'] = convertDate(row['Eintritt/Rentenbeginn'])
        row['Geburtstag'] = convertDate(row['Geburtstag'])
        row['Beginn vers f Dienstzeit'] = convertDate(
          row['Beginn vers.f. Dienstzeit']
        )
        row['Zusagedatum'] = convertDate(row['Zusagedatum'])

        const birthDay = DateTime.fromJSDate(row.Geburtstag)
        const age = Math.floor(today.diff(birthDay, 'years').years)
        row.Alter = age

        app.service('data').create(row)
      })
  } catch (err) {
    console.log('err.message: ', err.message)
    console.log('\n\n\n\n\n\n')
  }
}, 1000)

const testMathRes = [
  {
    year: 2019,
    data: {
      dbo_boy: 8,
      service_cost: 1,
      interest_cost: 9,
      contributions: 0,
      benefits_paid: 8,
      remeasurements: 8,
      dbo_eoy: 32
    }
  },
  {
    year: 2020,
    data: {
      dbo_boy: 8,
      service_cost: 1,
      interest_cost: 9,
      contributions: 0,
      benefits_paid: 8,
      remeasurements: 8,
      dbo_eoy: 32
    }
  }
]

module.exports = app
