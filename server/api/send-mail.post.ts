export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { sendMail } = useNodeMailer();
    return sendMail({ subject: body.subject, html: body.content, to: body.to });
})