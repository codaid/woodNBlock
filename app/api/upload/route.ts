import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const secret = env.NEXTAUTH_SECRET;
const pdfpath = env.PDF_PATH;

export const POST = async (req: NextRequest) => {
    try {
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

        if (user.userType !== "admin")
            return NextResponse.json(
                { message: "Not authorize" },
                { status: 403 }
            );
        const data = await req.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json(
                { message: "Missing file" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = file.name.replace(" ", "_");

        const filePath = join(pdfpath, fileName);
        await fs.writeFile(filePath, buffer);

        const fileExists = await prisma.catalog.findUnique({
            where: { title: fileName },
        });
        if (fileExists) {
            console.log("Already exists");
            return NextResponse.json(
                { message: "Title already exists" },
                { status: 409 }
            );
        }

        const pdf = await prisma.catalog.create({
            data: {
                title: fileName,
            },
        });

        return NextResponse.json(
            { message: "File uploaded successfully" },
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

export const GET = async (req: NextRequest) => {
    try {
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

        // const files = await fs.readdir(pdfpath);
        // const pdfFiles = files.filter((file) => file.endsWith(".pdf"));
        const pdfFiles = await prisma.catalog.findMany();

        return NextResponse.json({ files: pdfFiles }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};

export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        const uid = token.sub;
        const user = await prisma.user.findUnique({
            where: { id: uid },
        });
        if (user?.userType !== "admin") {
            return NextResponse.json(
                { message: "Not allowed" },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { catalogId } = body;

        if (!catalogId)
            return NextResponse.json(
                { message: "Missing quizId" },
                { status: 404 }
            );

        await prisma.catalog.delete({
            where: { id: catalogId },
        });

        return NextResponse.json({ message: "Delete successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
