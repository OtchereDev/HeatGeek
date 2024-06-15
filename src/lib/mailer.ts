import nodemailer from "nodemailer";

export async function sendEmail(
  html: string,
  to: string,
  subject: string,
  attachment?: string,
  filename?: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
    ...(attachment?.length && {
      attachments: [
        {
          filename,
          path: attachment,
        },
      ],
    }),
  };

  transporter.sendMail(
    { ...mailOptions, attachDataUrls: true },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}
