function transformToCsv(hook) {
  const {
    params: { query }
  } = hook
  if (query.__options) {
    hook.params = {
      ...hook.params,
      ...query.__options
    }
    delete query.__options
  }
}

module.exports = transformToCsv
