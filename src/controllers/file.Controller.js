const uploadFile = require("../services/file.Service");

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let result = await uploadFile.uploadSingleFile(req.files.file);
  console.log(result);
  return res.status(200).json({
    EC: "ok",
  });
};

const postUploadMultipleFiles = async (req, res) => {
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.files.file);
  console.log(Array.isArray(req.files.file));
  if (Array.isArray(req.files.file)) {
    let result = await uploadFile.uploadMultipleFiles(req.files.file);
    console.log(result);
    return res.status(200).json({
      EC: "ok",
    });
  } else {
    //return await uploadFile.uploadSingleFile(req, res);
    return await postUploadSingleFile(req, res);
  }
};

module.exports = {
  postUploadSingleFile,
  postUploadMultipleFiles,
};
