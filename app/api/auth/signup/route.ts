import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { schemaAddUser } from "@/lib/schemaAddType";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../utils/sendMail";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const newUserData = schemaAddUser.parse(body);

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

        const existingUsername = await prisma.user.findUnique({
            where: { username: newUserData.username },
        });
        if (existingUsername) {
            console.log("pseudo");
            return NextResponse.json(
                {
                    user: null,
                    message: "This username already exists",
                },
                { status: 409 }
            );
        }

        const hashedPassword = await hash(newUserData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                ...newUserData,
                password: hashedPassword,
                userType: "user",
            },
        });

        const { password: newUserPassword, ...rest } = newUser;

        const emailSended = await sendMail(
            "Nouveau compte créé",
            `${newUser.lastname} ${newUser.firstname} s'est inscrit.`,
            env.TO_MAIL
        );
        // TODO: Write in error log il message not send

        return NextResponse.json(
            { user: rest, message: "User created successfully" },
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
