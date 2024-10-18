import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { PropsWithChildren } from "react";
import { LuMail, LuNewspaper, LuUser, LuZap } from "react-icons/lu";
import { Providers } from "./Providers";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: SiteConfig.title,
    description: SiteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

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
    {
        href: "/user",
        label: "Espace utilisateur",
        icon: <LuUser className="size-4 shrink-0" />,
    },
];

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <html lang="fr" className="" suppressHydrationWarning>
                <head>
                    <Script id="google-tag-manager" strategy="afterInteractive">
                        {/* <!-- Google Tag Manager --> */}
                        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-T34CCSPD');`}
                        {/* <!-- End Google Tag Manager --> */}
                    </Script>
                </head>
                <body
                    className={cn(
                        "bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <Providers>
                        {/* <!-- Google Tag Manager (noscript) --> */}
                        <noscript>
                            <iframe
                                src="https://www.googletagmanager.com/ns.html?id=GTM-T34CCSPD"
                                height="0"
                                width="0"
                                style={{
                                    display: "none",
                                    visibility: "hidden",
                                }}
                            ></iframe>
                        </noscript>
                        {/* <!-- End Google Tag Manager (noscript) --> */}
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
                        <TailwindIndicator />
                    </Providers>
                </body>
            </html>
        </>
    );
}
