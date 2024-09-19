import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
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

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <html lang="fr" className="" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        "bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <Providers>
                        {/* <div className="relative flex min-h-screen flex-col">
                            <Header />
                            <div className="flex-1">{children}</div>
                            <Footer />
                        </div> */}
                        {children}
                        <TailwindIndicator />
                    </Providers>
                </body>
            </html>
        </>
    );
}
