const nodemailer = require("nodemailer");

const testEmail = async (options) => {
    try{
   // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // host: "smtp.elasticemail.com",
    // port: 2525,
    // auth: {
    //   user: "support@spectrumcapitals.com",
    //   pass: "0A338E12A6C0886BC92190FF60489FBFFA02",
    // },
    host: "smtp.mailersend.net",
    port: 587,
    auth: {
      user: "MS_hFvArT@spectrumcapitals.net",
      pass: "5Kcwslie8J6FyWMb",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Spectrum Capitals <support@spectrumcapitals.com>",
    to: options.email,
    subject: options.subject,
    html: options.html,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);     
    }catch(error){
        console.log(error);
    }
  
};

module.exports = testEmail;
