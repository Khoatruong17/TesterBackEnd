const uploadFile = require("../services/file.Service");
const mime = require("mime-types");

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let mimeType = mime.lookup(req.files.file.name);
  if (
    mimeType !== "application/msword" &&
    mimeType !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    throw new Error(
      "Only Word file are allowed. Please check your file(1 file)"
    );
  }
  let result = await uploadFile.uploadSingleFile(req.files.file);
  return result;
  // return res.status(200).json({
  //   EC: "ok",
  // });
};

const postUploadMultipleFiles = async (req, res) => {
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (Array.isArray(req.files.file)) {
    for (const file of req.files.file) {
      let mimeType = mime.lookup(file.name);
      if (
        mimeType !== "application/msword" &&
        mimeType !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        throw new Error(
          "Only Word files are allowed. Please check your files (multiple file)"
        );
      }
    }
    let result = await uploadFile.uploadMultipleFiles(req.files.file);
    return result;
  } else {
    return await postUploadSingleFile(req, res);
  }
};

module.exports = {
  postUploadSingleFile,
  postUploadMultipleFiles,
};
