export function parseErrors (error) {
  if (typeof error === 'string') { return error }

  var keys = Object.keys(error)
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]

    var message = error[k][0]
  }

  return message
}


export function displayError () {
  this.$message({
    type: 'error',
    message: message
  })
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export function calculateDistance(newLat, newLong, oldLat, oldLong) {
  var R = 6371

  var dLat = deg2rad(oldLat - newLat)
  var dLong = deg2rad(oldLong - newLong)

  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(newLat)) * Math.cos(deg2rad(oldLat)) *
    Math.sin(dLong/2) * Math.sign(dLong/2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  var d = R * c
  return d / 1.609344
}