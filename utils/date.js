function pad (number, length) {
  let str = '' + number
  while (str.length < length) {
    str = '0' + str
  }

  return str
}

function formatTimestamps (date) {
  const dt = date
  const dtstring = dt.getFullYear() +
      '-' + pad(dt.getMonth() + 1, 2) +
      '-' + pad(dt.getDate(), 2) +
      ' ' + pad(dt.getHours(), 2) +
      ':' + pad(dt.getMinutes(), 2) +
      ':' + pad(dt.getSeconds(), 2)
  return dtstring
}

function formatTime (date) {
  const dt = date
  const dtstring = dt.getHours() +
      ':' + pad(dt.getMinutes(), 2) +
      ':' + pad(dt.getSeconds(), 2) + '.00-03'
  return dtstring
}

module.exports = {
  formatTimestamps,
  formatTime
}
