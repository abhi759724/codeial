const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// by etherial

// create fake testing account
// let transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: "fakeuser@ethereal.email",
//     pass: "xA123456",
//   },
// });

// By Gmail

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smpt.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "demo759724@gmail.com",
    pass: "flhu tucu etwm uuxe",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering the template");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
