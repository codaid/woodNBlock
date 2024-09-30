import Authentication from "@/components/layout/home/authentication";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { getAuthSession } from "@/lib/auth";
import { t_navlink } from "@/type";
import { PropsWithChildren } from "react";
import { LuBookOpen, LuContact, LuSettings2, LuUsers2 } from "react-icons/lu";

const navlinks: t_navlink[] = [
    {
        href: "/admin",
        label: "Utilisateurs",
        icon: <LuUsers2 className="size-4 shrink-0" />,
    },
    {
        href: "/admin/prospect",
        label: "Liste des prospets",
        icon: <LuContact className="size-4 shrink-0" />,
    },
    {
        href: "/admin/catalog",
        label: "Catalogue",
        icon: <LuBookOpen className="size-4 shrink-0" />,
    },
    {
        href: "/admin/settings",
        label: "Settings",
        icon: <LuSettings2 className="size-4 shrink-0" />,
    },
];

const LayoutAdmin = async ({ children }: PropsWithChildren) => {
    const session = await getAuthSession();

    if (!session?.user)
        return (
            <div className="mx-auto w-fit max-w-4xl p-8">
                <Authentication />
            </div>
        );

    return (
        <div className="relative flex h-screen overflow-hidden bg-background antialiased dark:bg-background">
            <div className="fixed right-4 top-4 z-10 rounded-full">
                <ThemeToggle />
            </div>
            <Sidebar navlinks={navlinks} />
            {/* <div className="flex flex-col">
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
            </div> */}
            <div className="flex-1 overflow-y-auto bg-background dark:bg-background lg:pl-2 lg:pt-2">
                <div className="min-h-screen flex-1 overflow-y-auto border border-transparent bg-background lg:rounded-tl-xl lg:border-neutral-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;
