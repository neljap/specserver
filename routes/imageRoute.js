const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });
const {addImage, addKyc} = require("../controller/imageControllers");

const { Router } = require("express");

const ImageRoute = Router();

ImageRoute.post("/", upload.single("file"), addImage);
ImageRoute.post("/kyc", addKyc)
module.exports = ImageRoute;
