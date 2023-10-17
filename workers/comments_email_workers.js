const queue = require("../config/kue");
const commentsMailer = require("../mailers/comments_mailer");

queue.process("emails", (job, done) => {
  console.log(`Processing job ${job.id}`);
  commentsMailer.newComment(job.data);
  done();
});
