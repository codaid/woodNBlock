import { cn } from "@/lib/utils";
import { LuLoader2 } from "react-icons/lu";

type Props = {
    className?: string;
    size?: number;
};

const Loader = ({ className, ...props }: Props) => {
    return <LuLoader2 className={cn("animate-spin", className)} {...props} />;
};

export default Loader;
