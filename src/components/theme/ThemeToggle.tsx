"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant="link"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <span className="flex items-center justify-start gap-2 text-slate-300 hover:bg-transparent hover:text-slate-50 dark:text-slate-300">
                {theme === "dark" ? (
                    <LuMoon className="size-5" />
                ) : (
                    <LuSun className="size-6" />
                )}
                <span>{theme === "dark" ? "sombre" : "claire"}</span>
            </span>
        </Button>
    );
}
