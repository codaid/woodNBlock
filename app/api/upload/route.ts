import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

// const uploadDir = path.join(process.cwd(), "public/uploads");

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

export const POST = async (req: NextRequest) => {
    try {
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

        const filePath = join("/", "tmp/files", fileName);
        await fs.writeFile(filePath, buffer);
        console.log("filePath : ", filePath);

        const pdf = await prisma.catalog.create({
            data: {
                name: fileName,
            },
        });

        return NextResponse.json(
            { message: "File uploaded successfully" },
            { status: 200 }
        );

        // const form = new formidable.IncomingForm();
        // form.uploadDir = uploadDir;
        // form.keepExtensions = true;

        // form.parse(req, async (err, fields, files) => {
        //     if (err) {
        // 		return NextResponse.json(
        // 			{ message: "Error parsing form data" },
        // 			{ status: 500 }
        // 		);
        //         return;
        //     }

        //     const file = files.file;
        //     const filePath = path.join('/uploads', path.basename(file.path));

        //     try {
        //         // Enregistrer les métadonnées dans la base de données
        //         const pdf = await prisma.pdf.create({
        //             data: {
        //                 name: file.name,
        //                 url: filePath,
        //             },
        //         });

        //         res.status(200).json(pdf);
        //     } catch (uploadErr) {
        //         res.status(500).json({ error: 'Error saving file metadata' });
        //     }
        // });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};
