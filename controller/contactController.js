const Contact = require("../model/contactModel");

async function createContact(req, res){
    try{
        const {email, fullname, message, subject} = req.body;

        const newContactInfo = await Contact.create({
            email, fullname, message, subject
        })

        res.json({
            message: "successful",
            newContactInfo
        })

    }catch(error){
        res.status(500).json({error:`Internal Server Error: ${error}`})
    }
}

module.exports = createContact;