const products = require("../data/data.json")

async function getProducts() {
    return new Promise(function(resolve, reject) {
        resolve(products)
    })
}
module.exports = {
    getProducts
}