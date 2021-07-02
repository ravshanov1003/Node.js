const fs = require("fs")

// const products = require("../data/data.json")

function getData(req, res) {
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
    return promise
}

function writeToFile(products, res) {
    fs.writeFile("../data/data.json", JSON.stringify(products), 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { "Content-type": "text/json" })
            res.write(JSON.stringify({ message: "Product has been saved" }))
            res.end()
        }
    })
}
module.exports = {
    getData,
    writeToFile
}