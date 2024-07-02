import Authentication from "@/components/layout/home/authentication";

const AuthenticationPage = () => {
    return (
        // <div className="mx-auto max-w-3xl p-10">
        //     <Card>
        //         <CardHeader>
        //             <CardTitle>
        //                 {" "}
        //                 <h1 className="text-center text-lg">
        //                     Se connecter
        //                 </h1>{" "}
        //             </CardTitle>
        //         </CardHeader>
        //         <CardContent>
        //             <SignIn />
        //         </CardContent>
        //     </Card>
        // </div>
        <div className="mx-auto w-fit max-w-4xl p-8">
            <Authentication />
        </div>
    );
};

export default AuthenticationPage;
