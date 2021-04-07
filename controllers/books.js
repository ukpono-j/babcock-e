const { book: Book } = require("../models/index");
const path = require("path");

module.exports.create = async (req, res) => {
  // find the department
  // upload file
  // and link to books Model and run association

  //upload
  // run express file upload to handle file uploading
  if (!req.files) {
    return res.badRequest().send("No files were uploaded.");
  }

  try {
    let files = { ...req.files };

    // generate random filename
    let stringChunk;
    let buf = new Buffer(16);
    for (let i = 0; i < buf.length; i++) {
      buf[i] = Math.floor(Math.random() * 256);
    }
    stringChunk = buf.toString("base64");
    stringChunk = stringChunk.replace(/[+/=]/g, "");

    const signName =
      stringChunk + Date.now() + path.parse(files.upload.name).ext;
    await files.upload.mv(path.join(__dirname, "..", "uploads", signName));

    // create book in DB
    const book = await Book.create({
      name: req.body.name,
      author: req.body.author,
      filename: signName,
    });

    return res.json({
      status: true,
      msg: "Uploads was successfull",
    });
  } catch (err) {
    return res.internalServerError().send(err);
  }
};

module.exports.getOne = async (req, res) => {
  try {
    // find the fileName
    // pipe file stream to response
    const bookName = req.params.bookName;
    const book = await Book.findOne({ where: { name: bookName } });
    return res.sendFile(path.join(__dirname, "..", "uploads", book.filename));
  } catch (err) {
    console.log(err);
    return res.internalServerError().send(err);
  }
};
