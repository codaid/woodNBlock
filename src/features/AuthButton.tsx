import { getAuthSession } from "@/lib/auth";
import LoginButton from "./LoginButton";
import LoggedButton from "./LoggedButton copy";

const AuthButton = async () => {
    const session = await getAuthSession();

    const user = session?.user;

    if (!user) {
        return <LoginButton />;
    }

    return <LoggedButton user={user} />;
};

export default AuthButton;
