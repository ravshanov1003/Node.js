const fs = require("fs")
const uuid = require("uuid")

const { getData } = require("../utils/utils")
const products = require("../data/data.json")
const { writeToFile } = require("../utils/utils")
const Product = require("../models/productModel")


async function getAllProducts(req, res) {
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
}

function getProductById(req, res, id) {
    id = req.url.split("/")[2]
    const product = products.find((product) => product.id === id)
    if (!product) {
        res.writeHead(404, { "Content-type": "text/json" })
        res.write(JSON.stringify({ message: "Product not found" }))
    } else {
        res.writeHead(200, { "Content-type": "text/json" })
        res.write(JSON.stringify(product))
    }
    res.end()
}

async function createProduct(req, res) {
    try {
        const product = await getData(req, res)
        const productObj = JSON.parse(product)
        const newProduct = {
            id: uuid.v4(),
            name: productObj.name,
            description: productObj.description,
            price: productObj.price
        }
        products.push(newProduct)
        writeToFile(products, res)

    } catch (error) {
        console.log(error);
        res.writeHead(404, { "Content-type": "text/json" })
        res.write(JSON.stringify({ message: "Bad request" }))
        res.end()
    }
}

function deleteProductById(req, res, id) {
    id = req.url.split("/")[2]
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
}

function updateProductById(req, res, id) {
    id = req.url.split("/")[2]
    const product = products.find((product) => product.id === id)
    if (!product) {
        res.writeHead(404, { "Content-type": "text/json" })
        res.write(JSON.stringify({ message: "Product not found" }))
        res.end()
    } else {
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
        promise.then((data) => {
            const { name, description, price } = JSON.parse(data)
            let updateProduct = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
            }
            let index = products.findIndex(p => p.id === id)
            products[index] = {
                id,
                ...updateProduct,
            }
            fs.writeFile("./data/data.json", JSON.stringify(products, null, 3), 'utf8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, { "Content-type": "text/json" })
                    res.write(JSON.stringify({ message: "Product has been updated" }))
                    res.end()
                }
            })
        })
    }
}
module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProductById,
}