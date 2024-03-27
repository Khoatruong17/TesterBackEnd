const uploadFile = require("../services/file.Service");

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let result = await uploadFile.uploadSingleFile(req.files.file);
  console.log(result);
  return res.status(200).json({
    EC: "ok",
  });
};

const postUploadMultipleFiles = (req, res) => {};

module.exports = {
  postUploadSingleFile,
  postUploadMultipleFiles,
};
