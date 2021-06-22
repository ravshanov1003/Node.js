// moesif
const http = require('http')
const fs = require('fs')
const server = http.createServer(sendData);
server.listen(3000, () => console.log("Server is running"))

function sendData(request, response) {
    if (request.url === '/product') {
        fs.readFile('mackbook.txt', 'utf8', (err, data) => {
            if (err) {
                response.writeHead(404)
                response.write("Not Found")
            } else {
                let arr = data.split(',')
                let product = {
                    name: arr[0],
                    imageUrl: arr[1],
                    description: arr[2],
                    price: arr[3]
                }
                response.writeHead(200, { 'Content-type': 'text/json' })
                response.write(JSON.stringify(product, null, 2));
            }
            response.end()
        })
    }
}