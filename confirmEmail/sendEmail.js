const nodemailer = require("nodemailer");
module.exports.sendEmailFromUser = async (option) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "salahlever@gmail.com", // generated ethereal user
      pass: "vmskblqfqqxqklye", // generated ethereal password
    },
  });
  transporter.sendMail({
    from: '"Fred Foo 👻" <salahlever@gmail.com>', // sender address
    to: option.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1> ${option.message} </h1> `, // html body
  },(err,info)=>{
    if(err){
      console.log(err);
    }else{
      console.log(info);
    }
  })


};
