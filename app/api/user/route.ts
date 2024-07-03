import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { schemaUserUpdate } from "@/schemaType";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = env.NEXTAUTH_SECRET;

/**
 * Update an ad
 * @param data: t_userUpdate
 * @returns
 */
export const PATCH = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id, userType } = schemaUserUpdate.parse(body);

        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }
        const userId = token.sub;
        // Get current user to check who try this
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!currentUser || currentUser.userType !== "admin")
            return NextResponse.json(
                { message: "Not authorize" },
                { status: 403 }
            );

        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const updateResult = await prisma.user.updateMany({
            where: { id },
            data: {
                userType,
            },
        });

        if (updateResult.count === 0) {
            return NextResponse.json(
                { message: "Not authorized" },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { message: "User updated successfully" },
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
        const { userId } = body;

        if (!userId)
            return NextResponse.json(
                { message: "Missing quizId" },
                { status: 404 }
            );

        await prisma.user.delete({
            where: { id: userId },
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
