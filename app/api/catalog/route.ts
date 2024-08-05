import { authorizeCheck } from "@/lib/auth";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const pdfpath = env.PDF_PATH;

export const POST = async (req: NextRequest) => {
    try {
        const authorized = await authorizeCheck(req, ["admin"]);
        if (authorized instanceof NextResponse) {
            return authorized;
        }

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
        const fileName = file.name.replaceAll(" ", "_");

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

        const filePath = join(pdfpath, fileName);
        await fs.writeFile(filePath, buffer);

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
        const authorized = await authorizeCheck(req, ["commercial", "admin"]);
        if (authorized instanceof NextResponse) {
            return authorized;
        }

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
        const authorized = await authorizeCheck(req, ["admin"]);
        if (authorized instanceof NextResponse) {
            return authorized;
        }

        const body = await req.json();
        const { catalogId } = body;

        if (!catalogId)
            return NextResponse.json(
                { message: "Missing catalogId" },
                { status: 404 }
            );

        const catalog = await prisma.catalog.findUnique({
            where: { id: catalogId },
        });

        if (!catalog)
            return NextResponse.json(
                { message: "Catalog not found" },
                { status: 404 }
            );

        const filePath = join(pdfpath, catalog.title);
        await fs.unlink(filePath);

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
