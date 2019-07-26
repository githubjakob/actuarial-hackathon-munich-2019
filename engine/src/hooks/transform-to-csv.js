const { parse } = require('json2csv')

function transformToCsv(hook) {
  const { params } = hook
  if (params.csv) {
    if (hook.result.data && hook.result.data.length)
      hook.result.data = parse(hook.result.data)
    else hook.result = null
  }
}

module.exports = transformToCsv
