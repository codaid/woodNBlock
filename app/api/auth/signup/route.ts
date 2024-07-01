import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const SchemaUserSignup = z.object({
    username: z.string(),
    lastName: z.string(),
    firstName: z.string().email(),
    number: z.number(),
    email: z.string().email(),
    password: z.string(),
});

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const newUserData = SchemaUserSignup.parse(body);

        const existingEmail = await prisma.user.findUnique({
            where: { email: newUserData.email },
        });
        if (existingEmail) {
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

        return NextResponse.json(
            { user: rest, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" });
    }
};
