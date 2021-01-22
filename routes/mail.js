const router = require('express').Router();
const mailer = require('nodemailer');
const options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
};
const stmp = new mailer.createTransport(options);

router.post('/', async (req, res) => {
  try {
    const info = await stmp.sendMail({
      from: '"OMG Admin" <omg-noreply@etherio.net>',
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.message || undefined,
      html: req.body.html || undefined,
    });
    res.status(201).json({ message: 'id#' + info.messageId });
  } catch (e) {
    console.log(e);
    res.status(e.code || 400).json({ error: e.message });
  }
});

module.exports = router;
