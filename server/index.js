const http = require('http')
const pageData = require('./data/page.json')
const fs = require("fs");
const path = require("path");

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    const {method, url, headers} = req
    if (headers.origin !== undefined && headers.origin.indexOf("http://localhost:6006") > -1) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:6006")
        res.setHeader("Access-Control-Request-Methods", "GET")
    }
    if (headers.origin !== undefined && headers.origin.indexOf("http://localhost:12000") > -1) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:12000")
        res.setHeader("Access-Control-Request-Methods", "GET")
    }
    if (headers.origin !== undefined && headers.origin.indexOf("http://localhost:3000") > -1) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.setHeader("Access-Control-Request-Methods", "GET")
    }
    switch (method) {
        case "GET": {
            switch (url) {
                case "/": {
                    console.log("accept base request")
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('Hello World\n')
                    break
                }
                case "/page/1": {
                    console.log("accept page request")
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    const data = JSON.stringify(pageData)
                    res.end(data)
                    break
                }
                case "/docs": {
                    console.log("accept sketch list request")
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(["test.sketch"]))
                    break
                }
                case "/docs/test.sketch": {
                    console.log("accept sketch request")
                    res.statusCode = 200
                    const fileName = "test.sketch"
                    const filePath = path.join(__dirname, fileName)
                    const stats = fs.statSync(filePath)
                    res.setHeader('Content-Type', 'application/octet-stream')
                    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName)
                    res.setHeader('Content-Length', stats.size)
                    fs.createReadStream(filePath).pipe(res)
                    break
                }
            }
            break
        }
        default: {
            console.log("accept an other request")
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.end('Undefined Http Request\n')
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
