"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { LuLoader, LuSearch } from "react-icons/lu";

export function Search(props: { value?: string }) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(props.value);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());
        if (value === undefined) {
            return;
        } else if (value) {
            params.set("q", value);
        } else {
            params.delete("q");
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }, [pathname, router, searchParams, value]);

    return (
        <div className="relative">
            <LuSearch className="absolute left-2.5 top-3 size-4 text-gray-500" />
            <Input
                ref={inputRef}
                value={value ?? ""}
                onInput={(e) => {
                    setValue(e.currentTarget.value);
                }}
                spellCheck={false}
                className="w-full appearance-none bg-white pl-8 text-slate-900 shadow-none"
                placeholder="Search users..."
            />
            {isPending && (
                <div className="absolute inset-y-0 right-0 flex items-center justify-center">
                    <LuLoader className="-ml-1 mr-3 size-5 animate-spin text-gray-700" />
                </div>
            )}
        </div>
    );
}
