import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
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

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default LayoutCommercial;
