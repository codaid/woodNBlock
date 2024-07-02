// pages/api/admin/get-users.ts
import { getUsers } from "@/lib/getUsers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { search = "", offset = "0" } = await req.json();

    try {
        const { users, newOffset } = await getUsers(
            search as string,
            parseInt(offset as string, 10)
        );
        return NextResponse.json({ users, newOffset }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};
