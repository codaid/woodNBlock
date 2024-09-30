import { NavItem } from "@/components/admin/navItem";
import { Logo } from "@/components/icons";
import Authentication from "@/components/layout/home/authentication";
import Menu from "@/components/layout/menu";
import AuthButton from "@/features/AuthButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { LuBookOpen, LuContact, LuSettings2, LuUsers2 } from "react-icons/lu";

const LayoutAdmin = async ({ children }: PropsWithChildren) => {
    const session = await getAuthSession();

    if (!session?.user)
        return (
            <div className="mx-auto w-fit max-w-4xl p-8">
                <Authentication />
            </div>
        );

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-5">
                        <Link
                            className="flex items-center gap-2 font-semibold"
                            href="/"
                        >
                            <Logo />
                            <span className="">Wood&apos;N Block</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <NavItem href="/admin">
                                <LuUsers2 className="size-4" />
                                Utilisateurs
                            </NavItem>
                            <NavItem href="/admin/prospect">
                                <LuContact className="size-4" />
                                List des prospets
                            </NavItem>
                            <NavItem href="/admin/catalog">
                                <LuBookOpen className="size-4" />
                                Catalogue
                            </NavItem>
                            <NavItem href="/admin/settings">
                                <LuSettings2 className="size-4" />
                                Settings
                            </NavItem>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px] lg:justify-end">
                    <Link
                        className="flex items-center gap-2 font-semibold lg:hidden"
                        href="/"
                    >
                        <Logo />
                        <span className="">Wood&apos;N Block</span>
                    </Link>
                    <Menu />
                    <AuthButton />
                </header>
                {children}
            </div>
        </div>
    );
};

export default LayoutAdmin;
