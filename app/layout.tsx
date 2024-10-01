import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
                        {children}
                        <TailwindIndicator />
                    </Providers>
                </body>
            </html>
        </>
    );
}
