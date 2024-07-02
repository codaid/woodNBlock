import Authentication from "@/components/layout/home/authentication";
import { getAuthSession } from "@/lib/auth";

const Layout = async () => {
    const session = await getAuthSession();

    if (!session?.user)
        return (
            <div className="mx-auto w-fit max-w-4xl p-8">
                <Authentication />
            </div>
        );

    return (
        <div>
            <h1>Connected</h1>
            <p>{session.user.name}</p>
        </div>
    );
};

export default Layout;
