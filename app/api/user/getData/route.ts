import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const SchemaUid = z.object({
    userId: z.string().min(3),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = SchemaUid.parse(body);

        if (!userId) {
            console.log("userId missing");
            return NextResponse.json(
                { message: "UserId missing" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user)
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );

        const { password, ...userWithoutPassword } = user;

        return NextResponse.json(
            { userData: userWithoutPassword },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
