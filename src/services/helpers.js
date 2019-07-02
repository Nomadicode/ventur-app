export function parseErrors (error) {
  if (typeof error === 'string') { return error }

  var keys = Object.keys(error)
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]

    var message = error[k][0]
  }

  return message
}
