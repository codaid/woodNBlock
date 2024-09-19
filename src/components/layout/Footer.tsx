import Logo from "@/assets/logo.jpeg";
import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-card">
            <div className="m-auto w-full max-w-3xl px-2 py-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <Image src={Logo} width={50} alt="app logo" />
                        <Link href="/">{SiteConfig.title}</Link>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                        <Link className="hover:underline" href="/legal/privacy">
                            Politique de Confidentialité
                        </Link>
                        <Link className="hover:underline" href="/legal/cgv">
                            Conditions Générales de Vente
                        </Link>
                    </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-1 border-t border-neutral-100 p-4 ">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Wood&apos;N Block All
                        rights reserved
                    </p>
                    <div className="justify-center text-center text-xs text-neutral-500">
                        &#8212; Made by{" "}
                        <Link
                            href={"https://codaid.com"}
                            className="text-sm font-bold text-primary"
                        >
                            Codaid
                        </Link>
                        &#8212;
                    </div>
                </div>
            </div>
        </footer>
    );
};
