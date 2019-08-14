const server = require("express")()
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")

// routes

//Middleware
server.use(express.json()) // parse incoming request to json
server.use(helmet()) // helps secure your express by  setting https headers
server.use(cors()) // cross-domain request sharing CORS
server.use(morgan("dev")) //debugging logger

// use Routes

module.exports = server
