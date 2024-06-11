import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();

  const { name, email, senderEmail, password, message, subject } = body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: senderEmail,
      pass: password,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  try {
    await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({
      message: "Error sending email",
      error: error.message,
    });
  }
}
