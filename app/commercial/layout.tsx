import Authentication from "@/components/layout/home/authentication";
import { getAuthSession } from "@/lib/auth";
import { PropsWithChildren } from "react";

const LayoutCommercial = async ({ children }: PropsWithChildren) => {
    const session = await getAuthSession();

    if (!session?.user)
        return (
            <div className="mx-auto w-fit max-w-4xl p-8">
                <Authentication />
            </div>
        );

    return children;
};

export default LayoutCommercial;
