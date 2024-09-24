import { Sidebar } from "./_sidebar";
// import "./globals.css";

// const inter = Inter({
//     subsets: ["latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full overflow-hidden bg-gray-100 antialiased">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-gray-100 lg:pl-2 lg:pt-2">
                <div className="min-h-screen flex-1 overflow-y-auto border border-transparent bg-white lg:rounded-tl-xl lg:border-neutral-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
