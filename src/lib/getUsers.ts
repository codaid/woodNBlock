import { prisma } from "@/lib/prisma";

export interface SelectUser {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    // ajoutez les autres champs nécessaires
}

export async function getUsers(
    search: string,
    offset: number
): Promise<{
    users: SelectUser[];
    newOffset: number | null;
}> {
    if (search) {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: search, mode: "insensitive" } },
                    { firstname: { contains: search, mode: "insensitive" } },
                    { lastname: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { phone: { contains: search, mode: "insensitive" } },
                ],
            },
            take: 1000,
            select: {
                id: true,
                username: true,
                email: true,
                firstname: true,
                lastname: true,
                phone: true,
            },
        });
        return { users, newOffset: null };
    }

    if (offset === null) {
        return { users: [], newOffset: null };
    }

    const moreUsers = await prisma.user.findMany({
        skip: offset,
        take: 20,
        select: {
            id: true,
            username: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
        },
    });

    const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
    return { users: moreUsers, newOffset };
}
