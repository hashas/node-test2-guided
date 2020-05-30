const express = require("express")
const cors = require("cors")
const hobbitsRouter = require("./hobbits/hobbits-router")

const server = express()
const port = process.env.PORT || 5000

server.use(cors())
server.use(express.json())

server.use("/hobbits", hobbitsRouter)
server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

// stop the server starting when importing server obejct
// into test file, module.parent will be truthy if index.js
// (being the 'start' file specified in package.json) is
// imported to another file because then the latter file
// becomes the parent of index.js (when we run 'npm test')

// alternative method is to put above code in a separate
// file and import that into test file without server.listen()
if (!module.parent) {
	server.listen(port, () => {
		console.log(`Running at http://localhost:${port}`)
	})
}

// export server object so we can import it into test file
module.exports = server
