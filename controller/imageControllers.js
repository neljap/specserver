const {Kyc, Image} = require("../model/imageModel");


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

module.exports = { addKyc};
