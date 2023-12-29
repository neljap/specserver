const {addKyc} = require("../controller/imageControllers");

const { Router } = require("express");

const ImageRoute = Router();

ImageRoute.post("/kyc", addKyc)
module.exports = ImageRoute;
