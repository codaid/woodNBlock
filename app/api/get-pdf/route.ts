import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { z } from "zod";

const secret = env.NEXTAUTH_SECRET;
const pdfpath = env.PDF_PATH;

const schemaPdfName = z.object({
    title: z.string(),
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { title: pdfName } = schemaPdfName.parse(body);

        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }
        const userId = token.sub;

        if (!userId)
            return NextResponse.json(
                { message: "UserId missing" },
                { status: 404 }
            );

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user)
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );

        if (user.userType !== "commercial" && user.userType !== "admin")
            return NextResponse.json(
                { message: "Not authorize" },
                { status: 403 }
            );

        const filePath = join(pdfpath, pdfName);
        const stat = fs.statSync(filePath);

        const fileBuffer = fs.readFileSync(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "application.json",
                "Content-Length": stat.size.toString(),
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};
