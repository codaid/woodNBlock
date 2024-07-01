import SignIn from "@/components/layout/home/signIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Authentication = () => {
    return (
        <div className="mx-auto max-w-3xl p-10">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {" "}
                        <h1 className="text-center text-lg">
                            Se connecter
                        </h1>{" "}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SignIn />
                </CardContent>
            </Card>
        </div>
    );
};

export default Authentication;
