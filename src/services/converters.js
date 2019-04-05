import _ from 'lodash'

function objectKeysToCamelCase (snakeCaseObject) {
  var camelCaseObject = {}
  _.forEach(
    snakeCaseObject,
    function (value, key) {
      if (_.isPlainObject(value) || _.isArray(value)) {
        value = objectKeysToCamelCase(value)
      }
      camelCaseObject[_.camelCase(key)] = value
    }
  )
  return camelCaseObject
};

export default {
  'objToCamel': objectKeysToCamelCase
}
