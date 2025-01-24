import { env } from "@/lib/env";
import nodemailer from "nodemailer";
import { templateMail } from "./emailTreatment";

const email = env.MAIL;
const pass = env.PASS_MAIL;

const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendMail = async (
    subject: string,
    message: string,
    to: string
): Promise<boolean> => {
    try {
        console.log("\n\nEnter sendMail\n\n");
        const htmlTemplate = templateMail.replace("BODY_MESSAGE", message);

        const mailOptions = {
            from: email,
            to: to,
            bcc: "woodnblock@codaid.com",
            subject: subject,
            html: htmlTemplate,
        };

        await transporter.sendMail(mailOptions);
        console.log("\n\nsendMail success\n\n");
        return true;
    } catch (error) {
        console.log(error);
        console.log("\n\n\nsendMail error\n\n\n");
        return false;
    }
};
