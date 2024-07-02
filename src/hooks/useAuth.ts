// hooks/useAuth.ts
import { useSession } from "next-auth/react";

export const useAuth = () => {
    const { data: session, status } = useSession();

    return {
        session,
        isLoading: status === "loading",
    };
};
