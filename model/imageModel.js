const {Schema, model} = require("mongoose")

const imageSchema = new Schema({
    image: {
        type: Buffer,
        required: true
    }
})

const kycFile = new Schema({
    fileUrl: {type: String, required: true}
})

const Kyc = model("kyc", kycFile);

const Image = model("image", imageSchema);

module.exports = {Image, Kyc};