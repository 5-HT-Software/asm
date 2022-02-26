const fs = require("fs")

let dirs = [
    "./public/upload",
    "./public/upload/avatar",
    "./public/upload/image"
]

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
})
