import { env } from "@/lib/env";
import { schemaContact } from "@/schemaType";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../utils/sendMail";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const infos = schemaContact.parse(body);

        const message = `${infos.message}<br /><br />Email du contact : ${infos.email}`;

        const mailSended = await sendMail(
            `Contact: ${infos.object}`,
            message,
            env.TO_MAIL
        );

        return NextResponse.json(
            { message: "Message send successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};
