const http = require("http")
const fs = require("fs")
const uuid = require("uuid")
const products = require("./data/data.json")
    // const { getAllProducts } = require("./controllers/productController")

const server = http.createServer(function(req, res) {
    if (req.url === '/products' && req.method === "GET") {
        const productPromise = new Promise((res, rej) => {
            res(products)
        })
        productPromise
            .then((data) => {
                res.writeHead(200, { "Content-type": "text/plain" })
                res.write(JSON.stringify(data))
                res.end()
            })
            .catch((err) => {
                res.writeHead(404, { "Content-type": "text/plain" })
                res.write(err, '404')
                res.end()
            })
    } else if (req.url.match(/\/products\/\w+/) && req.method === "GET") { //regex
        const id = req.url.split("/")[2]
        const product = products.find((product) => product.id === id)
        if (!product) {
            res.writeHead(404, { "Content-type": "text/json" })
            res.write(JSON.stringify({ message: "Product not found" }))
        } else {
            res.writeHead(200, { "Content-type": "text/json" })
            res.write(JSON.stringify(product))
        }
        res.end()
    } else if (req.url === '/products' && req.method === "POST") {
        const promise = new Promise((resolve, reject) => {
            let body = ''
            req.on("data", (chunk) => {
                body += chunk
            })
            req.on('end', () => {
                resolve(body)
            });
            req.on("error", (err) => {
                console.log(err);
                reject("Error")
            })
        })
        promise
            .then((data) => {
                const productObj = JSON.parse(data);
                const product = {
                    id: uuid.v4(),
                    name: productObj.name,
                    description: productObj.description,
                    price: productObj.price
                }
                products.push(product)
                fs.writeFile("./data/data.json", JSON.stringify(products), 'utf8', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.writeHead(200, { "Content-type": "text/json" })
                        res.write(JSON.stringify({ message: "Success" }))
                        res.end()
                    }
                })
            })
            .catch(error => {
                res.writeHead(404, { "Content-type": "text/json" })
                res.write(JSON.stringify({ message: "Bad request" }))
                res.end()
            })
    } else if (req.url.match(/\/products\/\w+/) && req.method === "DELETE") { //regex
        const id = req.url.split("/")[2]
        const product = products.find((product) => product.id === id)
        if (!product) {
            res.writeHead(404, { "Content-type": "text/json" })
            res.write(JSON.stringify({ message: "Product not found" }))
        } else {
            let newProducts = products.filter((element) => element.id !== id)
            res.writeHead(200, { "Content-type": "text/json" })
            res.write(JSON.stringify(newProducts))
        }
        res.end()
    } else {
        console.log("Invalid url");
    }
})

server.listen(3000, () => console.log('Server is running'))