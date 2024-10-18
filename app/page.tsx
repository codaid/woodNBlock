import InfoForms from "@/components/homeComponent/infoForms";
import RdvHeroe from "@/components/homeComponent/rdvHeroe";
import { Container } from "@/components/ui/container";

export default function Home() {
    return (
        <Container>
            <RdvHeroe />
            <InfoForms />
        </Container>
        // <div className="relative flex min-h-screen flex-col">
        //     <Header />
        //     <div className="flex-1 text-center">
        //         <HeroSection />
        //     </div>
        //     <Footer />
        // </div>
    );
}
