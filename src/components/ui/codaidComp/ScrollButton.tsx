"use client";

import { Button } from "@/components/ui/button";
import PulsatingButton from "@/components/ui/magicUi/PulsatingButton";
import ShinyButton from "@/components/ui/magicUi/ShinyButton";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { LuChevronsDown } from "react-icons/lu";

type Props = {
    className?: string;
    callBack?: () => void;
    variant?: "pulse" | "shiny";
};

const ScrollButton = ({
    children,
    className,
    callBack,
    variant = "shiny",
}: PropsWithChildren<Props>) => {
    if (variant === "shiny") {
        return (
            <Button
                variant={"customGhost"}
                onClick={callBack}
                className={cn("w-fit p-0", className)}
            >
                <ShinyButton className="bg-color_primary">
                    <div className="flex flex-row items-center justify-center text-white">
                        {children}
                        <LuChevronsDown
                            className={"ml-2 size-5 animate-bounce"}
                        />
                    </div>
                </ShinyButton>
            </Button>
        );
    }

    if (variant === "pulse") {
        return (
            <Button variant={"customGhost"} onClick={callBack} asChild>
                <PulsatingButton>
                    <div className="flex flex-row items-end justify-center">
                        {children}
                        <LuChevronsDown
                            className={"ml-2 size-5 animate-bounce"}
                        />
                    </div>
                </PulsatingButton>
            </Button>
        );
    }
};

export default ScrollButton;
