import { authorizeCheck } from "@/lib/auth";
import { env } from "@/lib/env";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { z } from "zod";

const pdfpath = env.PDF_PATH;

const schemaPdfName = z.object({
    title: z.string(),
});

export const POST = async (req: NextRequest) => {
    try {
        const authorized = await authorizeCheck(req, ["commercial", "admin"]);
        if (authorized instanceof NextResponse) {
            return authorized;
        }

        const body = await req.json();
        const { title } = schemaPdfName.parse(body);

        const filePath = join(pdfpath, title + ".pdf");
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
