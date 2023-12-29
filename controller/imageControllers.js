const {Kyc, Image} = require("../model/imageModel");

const addImage = async (req, res) => {
  console.log("upload successful");
  try {
    // const image = new Image({
    //     image: req.file
    // })
    // const newImage = await image.save()
    // res.send(newImage._id)
    res.json(req.file);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const addKyc = async(req, res) => {
  try {
    const {fileUrl} = req.body;
    const fud = await  Kyc.create({fileUrl})
    res.status(200).json({
      message: 'successful',
      fud
    })
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error}`)
  }
}

module.exports = {addImage, addKyc};
