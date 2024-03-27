const uploadSingleFile = (file) => {
  let uploadPath =
    __dirname + "/somewhere/on/your/server/upload/" + sampleFile.name;

  file.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return {
        EM: "File upload failed",
        EC: 1,
      };
    }
    console.log("File uploaded to" + uploadPath);
  });
};

const uploadMultipleFiles = () => {};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
