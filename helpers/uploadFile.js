const path = require("path")
const fs = require("fs").promises
const {nanoid} = require("nanoid")

const uploadFile = async (file, folderName) => {
  let fileExtension = file.originalFilename.split(".")
  let fileName = nanoid() + '.' + fileExtension[fileExtension.length - 1]
  let oldPath = file.filepath
  let newPath = path.join(__dirname, `../public/upload/${folderName}`)
    + '/' + fileName
  let dbPath = `/upload/${folderName}/` + fileName
  try {
    let rawData = await fs.readFile(oldPath)
    await fs.writeFile(newPath, rawData)
    return dbPath
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = {uploadFile}