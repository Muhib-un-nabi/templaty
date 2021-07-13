const mailSMTP = require('./mailSMTP');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `Templaty <${process.env.EMAIL_USERNAME}>`;
  }

  // Send the actual email
  async send(subject) {
    const html = `
    <p>
    If You Request Fro reset a <b>password:</b>
    Then <a href="${this.url}">Click Here</a>,
    if you don't Request For <b>Reset password Then ignoor that</b>
    </p>`;
    // Define email options
    const mailOptions = {
      // SMTP Option
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      from: this.from,

      // mail Option
      to: [this.to],
      subject,
      body: html
    };
    // send email
    await mailSMTP(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send('Your password reset token (valid for only 10 minutes)');
  }
};
