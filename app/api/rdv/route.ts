import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { schemaAddProspect } from "@/lib/schemaAddType";
import { NextRequest, NextResponse } from "next/server";
import { generateProspectTable } from "../utils/emailTreatment";
import { sendMail } from "../utils/sendMail";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const prospect = schemaAddProspect.parse(body);

        const newProspect = await prisma.prospect.create({
            data: prospect,
        });

        const message = generateProspectTable(prospect);

        const mailSended = await sendMail(
            `${prospect.lastname} ${prospect.firstname} prospect`,
            message,
            env.TO_MAIL
        );

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
