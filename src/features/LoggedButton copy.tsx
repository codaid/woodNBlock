"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";

type Props = {
    user: Session["user"];
};

const LoggedButton = ({ user }: Props) => {
    const mutation = useMutation({
        mutationFn: async () => signOut(),
    });

    return (
        <DropdownMenu>
            <AlertDialog>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Avatar className="mr-2 size-6">
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                            {user.image && (
                                <AvatarImage
                                    src={user.image}
                                    alt={`${user.name} avatar`}
                                />
                            )}
                        </Avatar>
                        {user.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <AlertDialogTrigger>
                        <DropdownMenuItem>
                            <LuLogOut className="mr-2" size={12} />
                            Se déconnecter
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Voulez-vous vraiment vous déconnecter ?
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            <Button variant="secondary">Anuler</Button>
                        </AlertDialogCancel>
                        <Button
                            variant="destructive"
                            disabled={mutation.isPending}
                            onClick={() => mutation.mutate()}
                        >
                            Déconnexion
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    );
};

export default LoggedButton;
