import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const GET = () => {
    const filePath = path.resolve("./public/test.pdf");
    const stat = fs.statSync(filePath);

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": "application.json",
            "Content-Length": stat.size.toString(),
        },
    });
};
