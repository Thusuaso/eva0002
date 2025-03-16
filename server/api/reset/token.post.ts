import nodemailer from 'nodemailer';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const html = `
      <div>Parola değiştirmek için kullanılacak token => ${body.token}</div>

    `

    const transporter = nodemailer.createTransport({
        host:'mail.mekmar.com',
        port: 465,
        secure: true,
        auth: {
          user: "goz@mekmar.com",
          pass: "_bwt64h-3SR_-G2O",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
    const options = {
        from: 'goz@mekmar.com',
        to: body.mail,
        subject: 'Reset Password',
        html: html,
    };
    transporter.sendMail(options);
});