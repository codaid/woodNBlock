"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <LuSun className="size-6 dark:hidden" />
            <LuMoon className="hidden size-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
