import { prisma } from "@/lib/prisma";
import { schemaSelectUsers, t_userSelect } from "@/schemaType";

export async function getUsers(
    search: string,
    offset: number
): Promise<{
    users: t_userSelect[];
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
        const usersParse = schemaSelectUsers.parse(users);
        return { users: usersParse, newOffset: null };
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

    const usersParse = schemaSelectUsers.parse(moreUsers);
    const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
    return { users: usersParse, newOffset };
}
