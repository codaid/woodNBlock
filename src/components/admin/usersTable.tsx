"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { t_userSelect, t_userUpdate } from "@/schemaType";
import { deleteUser, updateUser } from "@/services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import Loader from "../ui/loader";

export function UsersTable({
    users,
    offset,
}: {
    users: t_userSelect[];
    offset: number | null;
}) {
    const router = useRouter();

    function onClick() {
        router.replace(`/?offset=${offset}`);
    }

    return (
        <>
            <form className="rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[150px]">
                                Name
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Email
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Username
                            </TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </form>
            {offset !== null && (
                <Button
                    className="mt-4 w-40"
                    variant="secondary"
                    onClick={() => onClick()}
                >
                    Next Page
                </Button>
            )}
        </>
    );
}

function UserRow({ user }: { user: t_userSelect }) {
    const userId = user.id;
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: async (dataUpdate: t_userUpdate) =>
            await updateUser(dataUpdate),
    });

    const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
        mutationFn: async (id: string) => {
            return await deleteUser(id);
        },
        onSuccess: async (res) => {
            if (!res.ok) {
                toast.error("Une erreur est survenue lors de la suppression");
                return;
            }
            toast.success("Utilisateur supprimé");
            router.refresh();
        },
    });

    return (
        <TableRow>
            <TableCell className="font-medium">
                <span>
                    {user.firstname} {user.lastname}
                </span>
                <br />
                <span>{user.phone}</span>
            </TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.userType}</TableCell>
            <TableCell className="max-w-[100px]">
                <Button
                    className="w-full"
                    size="sm"
                    variant="outline"
                    formAction={() => mutate({ id: userId, userType: "user" })}
                >
                    Utilisateur
                    {isPending && <Loader className="ml-2" />}
                </Button>
                <Button
                    className="w-full"
                    size="sm"
                    variant="outline"
                    formAction={() =>
                        mutate({ id: userId, userType: "commercial" })
                    }
                >
                    Commercial
                    {isPending && <Loader className="ml-2" />}
                </Button>
                <Button
                    className="mt-2 w-full"
                    size="icon"
                    variant="destructive"
                    formAction={() => mutateDelete(user.id)}
                >
                    <LuTrash2 />
                    {isPendingDelete && <Loader className="ml-2" />}
                </Button>
            </TableCell>
        </TableRow>
    );
}
