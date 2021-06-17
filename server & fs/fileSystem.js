const fs = require('fs')

fs.readFile('text.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

// try {
//     const data = fs.readFileSync('text.txt', 'utf8', )
//     console.log(data);
// } catch (err) {
//     console.log(err);
// }


// create new file
fs.writeFile('data.txt', 'Hello, this is node', (err) => {
    if (err) console.log(err);
    else console.log("Data has been written successfully");
})

// add new text to file
fs.appendFile('data.txt', ' Hello, this is MERN', (err) => {
    if (err) console.log(err);
    else console.log("Data has been written successfully");
})

// delete the file
fs.unlink('text.txt', (err) => {
    if (err) console.log(err);
    else console.log("File has been deleted");
})

// rename the file
fs.rename('data.txt', 'qqq.txt', (err) => {
    if (err) console.log(err);
    else console.log("File has been renamed");
})