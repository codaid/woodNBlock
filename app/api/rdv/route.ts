import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { schemaAddProspect } from "@/lib/schemaAddType";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateProspectTable, templateMail } from "./emailTreatment";

const email = env.MAIL;
const pass = env.PASS_MAIL;
// const transporter = nodemailer.createTransport({
//     host: "kitten.o2switch.net",
//     port: 465,
//     secure: true,
//     auth: {
//         user: email,
//         pass: pass,
//     },
// });
const transporter = nodemailer.createTransport({
    host: "mail.woodnblock.com",
    port: 465, // ou 587
    secure: true, // ou false si vous utilisez le port 587
    auth: {
        user: email, // Adresse email complète
        pass: pass, // Mot de passe exact
    },
    // tls: {
    //     rejectUnauthorized: false, // Ajoutez ceci si vous utilisez TLS sur le port 587
    // },
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const prospect = schemaAddProspect.parse(body);

        const newProspect = await prisma.prospect.create({
            data: prospect,
        });

        const htmlTemplate = templateMail.replace(
            "BODY_MESSAGE",
            generateProspectTable(prospect)
        );

        const mailOptions = {
            from: email,
            to: env.TO_MAIL,
            bcc: "contact@codaid.com",
            subject: `${prospect.lastname} ${prospect.firstname} prospect`,
            html: htmlTemplate,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Prospect created successfully", newProspect },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};
