import { Search } from "@/components/admin/search";
import { UsersTable } from "@/components/admin/usersTable";
import { getUsers } from "@/lib/getUsers";

const AdminPage = async ({
    searchParams,
}: {
    searchParams: { q: string; offset: string };
}) => {
    const search = searchParams.q ?? "";
    const offset = searchParams.offset ?? 0;
    const { users, newOffset } = await getUsers(search, Number(offset));

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="mb-8 flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Utilisateurs
                </h1>
            </div>
            <div className="mb-4 w-full">
                <Search value={searchParams.q} />
            </div>
            <UsersTable users={users} offset={newOffset} />
        </main>
    );
};

export default AdminPage;
