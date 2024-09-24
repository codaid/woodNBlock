import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { schemaInfoForm } from "../../rdv/_component/typeInfoForm";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const newUserData = schemaInfoForm.parse(body);

        const existingEmail = await prisma.user.findUnique({
            where: { email: newUserData.email },
        });
        if (existingEmail) {
            console.log("email");
            return NextResponse.json(
                {
                    user: null,
                    message: "This email address already exists",
                },
                { status: 409 }
            );
        }

        // TODO: stock data in database

        return NextResponse.json(
            { message: "Informations sended successfully" },
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
