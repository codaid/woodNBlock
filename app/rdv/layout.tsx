import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LuMail, LuNewspaper, LuZap } from "react-icons/lu";
import { Sidebar } from "../../src/components/layout/sidebar";

const navlinks = [
    {
        href: "/",
        label: "Accueil",
        icon: <LuZap className="size-4 shrink-0" />,
    },
    {
        href: "/about",
        label: "A propos",
        icon: <LuNewspaper className="size-4 shrink-0" />,
    },
    {
        href: "/contact",
        label: "Contact",
        icon: <LuMail className="size-4 shrink-0" />,
    },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex h-screen overflow-hidden bg-background antialiased dark:bg-background">
            <div className="fixed right-4 top-4 z-10 rounded-full">
                <ThemeToggle />
            </div>
            <Sidebar navlinks={navlinks} />
            <div className="flex-1 overflow-y-auto bg-background dark:bg-background lg:pl-2 lg:pt-2">
                <div className="min-h-screen flex-1 overflow-y-auto border border-transparent bg-background lg:rounded-tl-xl lg:border-neutral-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
