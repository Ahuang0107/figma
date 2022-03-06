const http = require('http')

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
                    const data = JSON.stringify({
                        id: "1",
                        name: "page-01",
                        layers: [
                            {
                                id: "10",
                                type: "RECTANGLE",
                                name: "rectangle",
                            },
                            {
                                id: "20",
                                type: "RECTANGLE",
                                name: "rectangle",
                            },
                            {
                                id: "30",
                                type: "GROUP",
                                name: "group",
                                subLayers: [
                                    {
                                        id: "40",
                                        type: "RECTANGLE",
                                        name: "rectangle",
                                        subLayers: [
                                            {
                                                id: "60",
                                                type: "RECTANGLE",
                                                name: "rectangle",
                                            },
                                            {
                                                id: "70",
                                                type: "RECTANGLE",
                                                name: "rectangle",
                                                subLayers: [
                                                    {
                                                        id: "80",
                                                        type: "RECTANGLE",
                                                        name: "rectangle",
                                                    },
                                                    {
                                                        id: "90",
                                                        type: "RECTANGLE",
                                                        name: "rectangle",
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        id: "50",
                                        type: "RECTANGLE",
                                        name: "rectangle",
                                    },
                                ]
                            },
                        ]
                    })
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
