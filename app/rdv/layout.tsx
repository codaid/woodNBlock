import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Sidebar } from "./_sidebar";

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
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-background dark:bg-background lg:pl-2 lg:pt-2">
                <div className="min-h-screen flex-1 overflow-y-auto border border-transparent bg-background lg:rounded-tl-xl lg:border-neutral-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
