const http = require('http')
const pageData = require('./data/page.json')

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
