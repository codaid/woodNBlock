import { Container } from "@/components/ui/container";
import InfoForms from "../../src/components/homeComponent/infoForms";
import RdvHeroe from "../../src/components/homeComponent/rdvHeroe";

const RdvPage = () => {
    return (
        <Container>
            <RdvHeroe />
            <InfoForms />
        </Container>
    );
};

export default RdvPage;
