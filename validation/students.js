const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function(data) {
  let message = {}
  data.name = !isEmpty(data.name) ? data.name : ""
  if (Validator.isEmpty(data.name)) {
    message.name = "name field is required"
  }

  return {
    message,
    isValid: isEmpty(message)
  }
}
