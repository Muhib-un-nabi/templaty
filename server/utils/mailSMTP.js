const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const htmlToText = require('html-to-text');

module.exports = async function({
  user,
  pass,
  host,
  port,
  from,

  to = [],
  cc = [],
  bcc = [],
  subject,
  body
}) {
  let transporter = nodemailer.createTransport(
    smtpTransport({
      host,
      port,
      secure: port == 465 ? true : false,
      auth: {
        user,
        pass
      }
    })
  );

  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from,
      to: to.join(', '),
      cc: cc.join(', '),
      bcc: bcc.join(', '),
      subject,
      html: body,
      text: htmlToText.fromString(body)
    });

    console.log('Email Sended');
    console.log(info);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (e) {
    console.log('Email Was Not Send');
    console.log(e);
  }
};
