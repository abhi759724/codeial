const nodeMailer = require("../config/nodemailer");

module.exports.newComment = async (comment) => {
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comments.ejs"
  );
  try {
    await nodeMailer.transporter
      .sendMail({
        from: "demo759724@gmail.com",
        to: "abhishek7597pandey@gmail.com",
        subject: "New comment on your post!",
        text: "comment published",
        html: htmlString,
      })
      .then((info) => {
        console.log("mail delivered", info);
      });
  } catch (err) {
    console.log("Error occurred while sending email");
    return console.error(err);
  }
};
