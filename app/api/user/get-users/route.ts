// pages/api/admin/get-users.ts
import { getUsers } from "@/lib/getUsers";
import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { search = "", offset = "0" } = req.query;

    try {
        const { users, newOffset } = await getUsers(
            search as string,
            parseInt(offset as string, 10)
        );
        return res.status(200).json({ users, newOffset });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};
