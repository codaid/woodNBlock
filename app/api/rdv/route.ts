import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { schemaInfoForm } from "../../rdv/_component/typeInfoForm";
import { generateProspectTable, templateMail } from "./emailTreatment";

const email = env.MAIL;
const pass = env.PASS_MAIL;
const transporter = nodemailer.createTransport({
    host: "kitten.o2switch.net",
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: pass,
    },
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const prospect = schemaInfoForm.parse(body);

        console.log("\n\n\nPasse\n\n\n");
        const newProspect = await prisma.prospect.create({
            data: prospect,
        });
        console.log("\n\n\nPasse\n\n\n");

        const htmlTemplate = templateMail.replace(
            "BODY_MESSAGE",
            generateProspectTable(prospect)
        );

        const mailOptions = {
            from: email,
            to: "contact@codaid.com",
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
