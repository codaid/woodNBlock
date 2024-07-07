"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserData } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ShowError from "../ui/error";
import Loader from "../ui/loader";

const Menu = () => {
    const { session, isLoading } = useAuth();
    const {
        data: userData,
        isLoading: isLoadingUserData,
        isError,
        error,
    } = useQuery({
        queryKey: ["user", session?.user.id],
        queryFn: async () => await getUserData(session?.user.id ?? ""),
        enabled: !!session,
    });

    if (isLoading || isLoadingUserData) return <Loader />;

    if (isError) return <ShowError errorMessage={error.message} />;

    return (
        <div className="flex gap-5">
            {userData?.userType === "user" && (
                <>
                    <Link href={"/"}>Accueil</Link>
                    <Link href={"/user"}>Espace utilisateur</Link>
                </>
            )}
            {userData?.userType === "commercial" && (
                <Link href={"/commercial"}>Espace commercial</Link>
            )}
            {userData?.userType === "admin" && (
                <>
                    <Link href={"/commercial"}>Espace commercial</Link>
                    <Link href={"/admin"}>Administration</Link>
                </>
            )}
        </div>
    );
};

export default Menu;
