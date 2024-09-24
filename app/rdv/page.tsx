import { Container } from "@/components/ui/container";
import InfoForms from "./_component/infoForms";
import RdvHeroe from "./_component/rdvHeroe";

const RdvPage = () => {
    return (
        <Container>
            <RdvHeroe />
            <InfoForms />
        </Container>
    );
};

export default RdvPage;
