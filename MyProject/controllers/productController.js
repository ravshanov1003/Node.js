const Product = require("../models/productModel")

async function getAllProducts(req, res) {
    try {
        const products = await Product.getProducts()
        res.writeHead(200, { 'Content-type': 'text/json' })
        res.write(JSON.stringify(products))
        res.end()
    } catch (err) {
        res.writeHead(200, { 'Content-type': 'text/plain' })
        res.end("Invalid")
    }
}
module.exports = {
    getAllProducts
}