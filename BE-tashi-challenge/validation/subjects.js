const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function(data) {
  let message = {}

  data.subject = !isEmpty(data.subject) ? data.subject : ""
  data.subject_score = !isEmpty(data.subject_score) ? data.subject_score : ""
  data.date = !isEmpty(data.date) ? data.date : ""

  if (Validator.isEmpty(data.subject)) {
    message.subject = "subject field is required"
  }
  if (Validator.isEmpty(data.subject_score)) {
    message.subject_score = "subject_score field is required"
  }
  if (Validator.isEmpty(data.date)) {
    message.date = "date field is required"
  }

  return {
    message,
    isValid: isEmpty(message)
  }
}
