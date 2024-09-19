import React from "react";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const CalSans = localFont({
    src: [{ path: "../../fonts/CalSans-SemiBold.woff2" }],
    display: "swap",
});

export const SubHeading = ({
    className,
    children,
    as: Tag = "h2",
}: {
    className?: string;
    children: React.ReactNode;
    as?: keyof JSX.IntrinsicElements;
}) => {
    return (
        <Tag
            className={cn(
                CalSans.className,
                "md:text-lg lg:text-2xl",
                className
            )}
        >
            {children}
        </Tag>
    );
};
