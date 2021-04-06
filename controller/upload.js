const { promises: fsPromises } = require("fs");
const path = require("path");
const filesDir = path.resolve(__dirname, "..", "uploads");

module.exports.upload = async (req, res, next) => {
    // run express file upload to handle file uploading
    if (!req.files) return next(errorResponse("No files were uploaded.", 400));

    try {
      let files = { ...req.files };
      if (files.upload.length && files.upload.length > 1) {
        await files.upload.forEach(async (file) => {
          await file.mv(path.join(filesDir, file.name)).catch(next);
        });
      } else {
        await files.upload.mv(path.join(filesDir, files.upload.name));
      }
    } finally {
      res.json({
        status: true,
        msg: "Uploads was successful",
      });
    }
  }