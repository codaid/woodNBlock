import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/home/hereoSection";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 text-center">
                <HeroSection />
            </div>
            <Footer />
        </div>
    );
}
