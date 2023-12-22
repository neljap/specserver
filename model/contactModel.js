const {Schema, model} = require("mongoose")

const contactSchema = new Schema({
    fullname: {type: String, required: [true, "Full Name is Required"]},
    message: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true}
})

const Contact = model("contact", contactSchema);

module.exports = Contact;