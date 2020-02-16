const express = require("express")
const { configureMiddleware } = require("../middleware")

// init express
const server = express()

// Configuring global middle ware
configureMiddleware(server)

// index route displays name
server.get("/", (req, res) => {
  res.send('<h1 style="text-align: center; font-size: 10rem;">Tashi-BE</h1>')
})

module.exports = server
