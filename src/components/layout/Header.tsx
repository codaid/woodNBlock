import Logo from "@/assets/logo.jpeg";
import AuthButton from "@/features/AuthButton";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import Menu from "./menu";

const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex items-center gap-2">
                    <Link href={"/"}>
                        <Image
                            src={Logo}
                            alt={"Logo"}
                            objectFit="contain"
                            width={50}
                        />
                    </Link>
                </div>

                <div>
                    <Menu />
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <ThemeToggle />
                        <AuthButton />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
