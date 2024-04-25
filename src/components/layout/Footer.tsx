import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-card">
            <div className="m-auto w-full max-w-3xl px-2 py-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <Image
                            src="/images/logo.jpg"
                            width={40}
                            height={30}
                            alt="app logo"
                        />
                        <Link href="/">{SiteConfig.title}</Link>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                        <Link className="hover:underline" href="/legal/privacy">
                            Privacy
                        </Link>
                        <Link className="hover:underline" href="/legal/cgv">
                            CGV
                        </Link>
                        <Link className="hover:underline" href="/courses">
                            Courses
                        </Link>
                        <Link className="hover:underline" href="/admin">
                            Admin
                        </Link>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Les_Bras_Cassés
                    </p>
                </div>
            </div>
        </footer>
    );
};
