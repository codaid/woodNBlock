import GridCatalog from "@/components/catalog/gridCatalog";

const CommercialPage = () => {
    return (
        <div className="relative overflow-hidden py-24 lg:py-32">
            {/* Gradients */}
            <div
                aria-hidden="true"
                className="absolute -top-96 start-1/2 flex -translate-x-1/2"
            >
                <div className="h-[44rem] w-[25rem] -translate-x-40 rotate-[-60deg] bg-gradient-to-r from-background/50 to-background blur-3xl" />
                <div className="h-[50rem] w-[90rem] origin-top-left -translate-x-60 -rotate-12 rounded-full bg-gradient-to-tl from-primary-foreground via-primary-foreground to-background blur-3xl" />
            </div>
            {/* End Gradients */}
            <div className="relative z-10">
                <div className="container py-10 lg:py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className=""></p>
                        {/* Title */}
                        <div className="mt-5 max-w-2xl">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Espace commerciale
                            </h1>
                        </div>
                        {/* End Title */}
                        <div className="mt-5 max-w-3xl">
                            <p className="text-xl text-muted-foreground">
                                Ici, vous retrouverez tous les catalogues
                                disponible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <GridCatalog />
        </div>
    );
};

export default CommercialPage;
