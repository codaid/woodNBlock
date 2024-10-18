import HeroSection from "@/components/layout/home/hereoSection";

const HomeUser = () => {
    return (
        <div className="relative flex min-h-screen flex-col">
            {/* <Header /> */}
            <div className="flex-1 text-center">
                <HeroSection />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default HomeUser;
