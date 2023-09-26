var nodemailer = require('nodemailer');
let userModel = require("./models/userModel");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kvasdev_be19@thapar.edu',
    pass: 'xzrokaarwdrtdnhm'
  }
});

var mailOptions = {
  from: 'kvasdev_be19@thapar.edu',
  to: userModel.email ,
  subject: 'Hi, Akshita',
  text: 'ghjkl'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
