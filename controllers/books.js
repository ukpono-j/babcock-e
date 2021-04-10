const { Book, Department } = require("../models/index");
const path = require("path");

module.exports.create = async (req, res) => {
  console.log("hit")
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
    let buf = Buffer.alloc(16);
    for (let i = 0; i < buf.length; i++) {
      buf[i] = Math.floor(Math.random() * 256);
    }
    stringChunk = buf.toString("base64");
    stringChunk = stringChunk.replace(/[+/=]/g, "");

    const signFileName = stringChunk + Date.now() + path.parse(files.upload.name).ext;
    const signCoverName = stringChunk + Date.now() + path.parse(files.cover.name).ext;
    await files.upload.mv(path.join(__dirname, "..", "uploads", signFileName));
    await files.cover.mv(path.join(__dirname, "..", "uploads", signCoverName));

    const dept = await Department.findOne({where:{id: req.body.department.toLowerCase()}});
    console.log(dept)
    console.log(req.body);

    if(!dept) return res.send(dept);

    // create book in DB
    const book = await Book.create({
      name: req.body.bookName,
      author: req.body.author,
      filename: signFileName,
      coverName: signCoverName
    });

    await dept.addBook(book);

    return res.redirect("/department/"+dept.name);

  } catch (err) {
    return res.redirect("/upload.html");
  }
};

module.exports.getBook = async (req, res) => {
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

module.exports.getCover = async (req, res) => {
  try {
    // find the fileName
    // pipe file stream to response
    const bookName = req.params.bookName;
    const book = await Book.findOne({ where: { name: bookName } });
    // console.log(bookName, book)
    return res.sendFile(path.join(__dirname, "..", "uploads", book.coverName));
  } catch (err) {
    console.log(err);
    return res.internalServerError().send(err);
  }
};
