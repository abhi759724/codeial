const nodemailer = require("nodemailer");

module.exports.newComment = (comment) => {
  console.log("Inside New comment mailer");

  nodemailer.tranporter.sendMail(
    {
      from: "<EMAIL>",
      to: "abhisheck@gmail.com",
      subject: "New comment on your post!",
      html: "<h1>Hello World!</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error occurred while sending email");
        return console.error(err);
      }
      console.log("message sent", info);
    }
  );
};
