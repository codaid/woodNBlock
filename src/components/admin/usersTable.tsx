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
import { t_userSelect } from "@/schemaType";
import { useRouter } from "next/navigation";

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
                            <TableHead></TableHead>
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
    const deleteUserWithId = () => console.log("deleted");

    return (
        <TableRow>
            <TableCell className="font-medium">
                {user.firstname}
                {user.lastname}
            </TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>
                <Button
                    className="w-full"
                    size="sm"
                    variant="outline"
                    formAction={deleteUserWithId}
                    disabled
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}
