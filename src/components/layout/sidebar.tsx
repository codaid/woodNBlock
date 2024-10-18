"use client";
import Logo from "@/assets/logo.jpeg";
import { Heading } from "@/components/ui/heading";
import { socials } from "@/constants/socials";
import { isMobile } from "@/lib/utils";
import { t_navlink } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { LuPanelRightClose } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { ThemeToggle } from "../theme/ThemeToggle";

type Props = {
    navlinks: t_navlink[];
};

export const Sidebar = ({ navlinks }: Props) => {
    const [open, setOpen] = useState(isMobile() ? false : true);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: -200 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        exit={{ x: -200 }}
                        className="fixed left-0 z-[100] flex h-screen max-w-56 flex-col justify-between bg-color_primary px-6 py-10 dark:bg-orange-950 lg:relative lg:w-fit"
                    >
                        <div className="flex-1 overflow-auto">
                            <SidebarHeader />
                            <Navigation setOpen={setOpen} navlinks={navlinks} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                className="fixed bottom-4 right-4 z-50 flex size-8 items-center justify-center rounded-full border border-neutral-200 backdrop-blur-sm lg:hidden"
                onClick={() => setOpen(!open)}
            >
                <LuPanelRightClose className="size-4 text-slate-900 dark:text-slate-300" />
            </button>
        </>
    );
};

export const Navigation = ({
    setOpen,
    navlinks,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navlinks: t_navlink[];
}) => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="relative z-[100] my-10 flex flex-col space-y-1">
            {navlinks.map((link: t_navlink) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => isMobile() && setOpen(false)}
                    className={twMerge(
                        "text-slate-300 hover:text-slate-50 dark:text-slate-300 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
                        isActive(link.href) &&
                            "bg-color_light shadow-lg hover:text-slate-900 text-slate-900 dark:text-slate-900"
                    )}
                >
                    {link.icon}
                    {/* <link.icon
                        className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            isActive(link.href) && "text-color_primary"
                        )}
                    /> */}
                    <span>{link.label}</span>
                </Link>
            ))}

            <Heading
                as="p"
                className="bg-gradient-to-r from-color_primary-foreground to-color_primary-light px-2 pt-10 text-sm md:text-sm lg:text-sm"
            >
                Socials
            </Heading>
            {socials.map((link: t_navlink) => (
                <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className={twMerge(
                        "text-slate-300 hover:text-slate-50 dark:text-slate-300 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
                    )}
                >
                    <link.icon
                        className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            isActive(link.href) && "text-color_primary"
                        )}
                    />
                    <span>{link.label}</span>
                </Link>
            ))}
            <Heading
                as="p"
                className="bg-gradient-to-r from-color_primary-foreground to-color_primary-light px-2 pt-10 text-sm md:text-sm lg:text-sm"
            >
                Theme
            </Heading>
            <Link href={"#"}>
                <ThemeToggle />
            </Link>
        </div>
    );
};

const SidebarHeader = () => {
    return (
        <div className="flex justify-center">
            <Image
                src={Logo}
                alt="Avatar"
                className="size-20 shrink-0 rounded-lg bg-transparent object-cover object-top"
            />
        </div>
    );
};
