const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "powerful",
  api_key: "629347238834619",
  api_secret: "0xMtu-4cSbzjPuRYm3o5uzTxCOQ",
});

module.exports = cloudinary;
