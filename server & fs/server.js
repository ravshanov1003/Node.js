// import "libuv";
const http = require('http');
const server = http.createServer(doOnIncoming);
server.listen(3000, () => console.log("Server is running"))
    // server.listen(3000, function() {
    //     console.log('Server is running on port 3000...')
    // })
    // doSomethingOnInComing = (data, setOfFunctions) => {
    //     // do some stuff...
    //     setOfFunctions.end("welcome to nodeJS")
    // }

function doOnIncoming(request, response) {
    // request
    if (request.url === '/') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        response.write("<html><body><h1>This is home page</h1></body></html>")
        response.end()
    } else if (request.url === '/student') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        response.write("<html><body><h1>This is student page</h1></body></html>")
        response.end()
    } else if (request.url === '/admin') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        response.write("<html><body><h1>This is admin page</h1></body></html>")
        response.end()
    } else {
        response.writeHead(404, { 'Content-type': 'text/html' })
        response.write("<html><body><h1>404</h1></body></html>")
        response.end()
    }
}