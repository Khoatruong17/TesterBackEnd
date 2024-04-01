const uploadFile = require("../services/file.Service");
const mime = require("mime-types");

let allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
];

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let mimeType = mime.lookup(req.files.file.name);

  if (!allowedMimeTypes.includes(mimeType)) {
    throw new Error(
      "Only image, Word, and PDF files are allowed. Please check your file(s) (single)."
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
      let mimeType = mime.lookup(req.files.file.name);

      if (!allowedMimeTypes.includes(mimeType)) {
        throw new Error(
          "Only image, Word, and PDF files are allowed. Please check your file(s) (multiple)."
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
