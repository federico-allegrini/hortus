import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,

  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeAnEmail(text) {
  return `
    <div className="email" style="
      border: 3px solid #666;
      padding: 20px;
      font-family: sans-serif;
      color: #333333;
      line-height: 1;
      font-size: 20px;
    ">
      <h2>Hortus</h2>
      <p>${text}</p>
    </div>
  `;
}

async function sendPasswordResetEmail(resetToken, to) {
  const info = await transport.sendMail({
    to,
    from: "admin@hortus.it",
    subject: "{ Hortus } Reset password",
    html: makeAnEmail(`
        <a
            style="
                color: #555555;
                text-decoration: none;
            "
            href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">
                Reset password
        </a>
    `),
  });
  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(`Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}

export default sendPasswordResetEmail;
