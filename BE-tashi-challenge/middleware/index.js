const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

const students = require("../routes/students")
const subjects = require("../routes/subjects")

const configureMiddleware = server => {
  server.use(express.json())
  server.use(helmet())
  server.use(morgan("dev"))
  server.use(cors())

  // routes
  server.use("/api/students", students)
  server.use("/api/subjects", subjects)
}

module.exports = {
  configureMiddleware
}
