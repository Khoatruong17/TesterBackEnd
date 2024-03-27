const path = require("path");

const uploadSingleFile = async (file) => {
  let uploadPath = path.resolve(__dirname, "../public/images/upload");

  let extName = path.extname(file.name);
  let basename = path.basename(file.name, extName);

  let finalName = `${basename} - ${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  try {
    await file.mv(finalPath);
    return {
      EM: "File uploaded successfully",
      EC: 0,
      DT: {
        path: finalName,
      },
    };
  } catch (error) {
    console.log(">> Check error (service): " + error);
    return {
      EM: "File upload failed",
      EC: 1,
    };
  }
};

const uploadMultipleFiles = () => {};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
