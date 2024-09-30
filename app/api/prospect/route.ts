import { authorizeCheck } from "@/lib/auth";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const secret = env.NEXTAUTH_SECRET;

const schemaProspectStatusUpdate = z.object({
    id: z.string(),
    status: z.enum(["idle", "treat"]),
});

export const PATCH = async (req: NextRequest) => {
    try {
        const authorized = await authorizeCheck(req, ["admin"]);
        if (authorized instanceof NextResponse) {
            return authorized;
        }

        const body = await req.json();
        const { id, status } = schemaProspectStatusUpdate.parse(body);

        const updateResult = await prisma.prospect.updateMany({
            where: { id },
            data: {
                status,
            },
        });

        if (updateResult.count === 0) {
            return NextResponse.json(
                { message: "Not authorized" },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { message: "Prospect updated successfully" },
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
