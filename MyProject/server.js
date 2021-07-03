const fs = require("fs")
const http = require("http")
const uuid = require("uuid")

const products = require("./data/data.json")
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } = require("./controllers/productController")

const server = http.createServer(function(req, res) {
    if (req.url === '/products' && req.method === "GET") {
        getAllProducts(req, res)
    } else if (req.url.match(/\/products\/\w+/) && req.method === "GET") { //regex
        getProductById(req, res)
    } else if (req.url === '/products' && req.method === "POST") {
        createProduct(req, res)
    } else if (req.url.match(/\/products\/\w+/) && req.method === "DELETE") { //regex
        deleteProductById(req, res)
    } else if (req.url.match(/\/products\/\w+/) && req.method === "PUT") {
        updateProductById(req, res)
    } else {
        console.log("Invalid url");
    }
})

server.listen(3000, () => console.log('Server is running'))
    // CRUD
    // Create
    // Read
    // Update
    // Delete