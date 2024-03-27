const uploadFile = require("../services/file.Service");

const postUploadSingleFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let result = uploadFile.uploadSingleFile(req.files.file);
  console.log(result);
};

const postUploadMutipleFiles = (req, res) => {};

module.exports = {
  postUploadSingleFile,
  postUploadMutipleFiles,
};
