const moment = require('moment')

exports.convertTimestamps = function (urls) {
  return urls.map(url => {
    const created_at = moment(url.created_at).fromNow()
    const updated_at = moment(url.updated_at).fromNow()
    return Object.assign({}, url, { created_at, updated_at })
  })
}