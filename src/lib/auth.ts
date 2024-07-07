import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { env } from "./env";
import { prisma } from "./prisma";

type ParametersGetServerSession =
    | []
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse];

export const getAuthSession = async (
    ...parameters: ParametersGetServerSession
) => {
    const session = await getServerSession(...parameters, authOptions);
    return session;
};

/**
 *
 * @param req NextRequest
 * @param authorize string[]
 * @returns user, error: instanceOf NexResponse
 */
export const authorizeCheck = async (req: NextRequest, authorize: string[]) => {
    try {
        const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }
        const userId = token.sub;

        if (!userId) {
            return NextResponse.json(
                { message: "UserId missing" },
                { status: 404 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (!authorize.includes(user.userType)) {
            return NextResponse.json(
                { message: "Not authorized" },
                { status: 403 }
            );
        }

        return user;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};
