import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";
import { Metadata } from "next";
import { Contact } from "./Contact";

export const metadata: Metadata = {
    title: "Contact | support",
    description: "Contacter le support.",
};

const ContactPage = () => {
    return (
        <Container>
            <span className="text-4xl">✉️</span>
            <Heading className="mb-2 font-black">Contact Me</Heading>
            <Paragraph className="mb-10 max-w-xl">
                Reach out to me over email or fill up this contact form. I will
                get back to you ASAP - I promise.{" "}
            </Paragraph>
            <Contact />
        </Container>
    );
};

export default ContactPage;
