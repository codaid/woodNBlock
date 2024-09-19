"use client";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

const FbHeroe = () => {
    const cards = data.map((card, index) => (
        <Card key={card.title.replaceAll(" ", "_")} card={card} index={index} />
    ));

    return (
        <div className="size-full py-20">
            <h2 className="mx-auto max-w-7xl pl-4 font-sans text-lg font-bold text-neutral-800 dark:text-neutral-200 md:text-4xl">
                Votre maison en un claquement de doigt.
            </h2>
            <Carousel items={cards} />
        </div>
    );
};

const DummyContent1 = () => {
    return (
        <>
            {/* {[...new Array(3).fill(1)].map((_, index) => {
                return ( */}
            <div
                // key={"dummy-content" + index}
                className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14"
            >
                <p className="mx-auto max-w-3xl pb-4 font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        La maison bois est tout d&apos;abord un héritage et un
                        rêve enfant. <br />
                    </span>{" "}
                    Avec Wood’N Block, elle est aussi devenue une idée moderne
                    en phase avec les nouvelles contraintes actuelles
                </p>
                <Image
                    src="/images/photo_01.jpg"
                    alt="Macbook mockup from Aceternity UI"
                    height="500"
                    width="500"
                    className="mx-auto size-full object-contain md:size-1/2"
                />
            </div>
            {/* );
            })} */}
        </>
    );
};
const DummyContent2 = () => {
    return (
        <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14">
            <p className="mx-auto max-w-3xl pb-4 font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    La maison bois est tout d&apos;abord un héritage et un rêve
                    enfant. <br />
                </span>{" "}
                Avec Wood’N Block, elle est aussi devenue une idée moderne en
                phase avec les nouvelles contraintes actuelles
            </p>
            <Image
                src="/images/photo_02.jpg"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="mx-auto size-full object-contain md:size-1/2"
            />
        </div>
    );
};
const DummyContent3 = () => {
    return (
        <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14">
            <p className="mx-auto max-w-3xl pb-4 font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    La maison bois est tout d&apos;abord un héritage et un rêve
                    enfant. <br />
                </span>{" "}
                Avec Wood’N Block, elle est aussi devenue une idée moderne en
                phase avec les nouvelles contraintes actuelles
            </p>
            <Image
                src="/images/photo_03.jpg"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="mx-auto size-full object-contain md:size-1/2"
            />
        </div>
    );
};
const DummyContent4 = () => {
    return (
        <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14">
            <p className="mx-auto max-w-3xl pb-4 font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    La maison bois est tout d&apos;abord un héritage et un rêve
                    enfant. <br />
                </span>{" "}
                Avec Wood’N Block, elle est aussi devenue une idée moderne en
                phase avec les nouvelles contraintes actuelles
            </p>
            <Image
                src="/images/photo_04.jpg"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="mx-auto size-full object-contain md:size-1/2"
            />
        </div>
    );
};

type dataType = {
    category: string;
    title: string;
    src: string;
    content: JSX.Element;
};

const data: dataType[] = [
    {
        category: "Maison bois",
        title: "La maison de vos rêves.",
        src: "/images/photo_01.jpg",
        content: <DummyContent1 />,
    },
    {
        category: "Maison bois",
        title: "La maison moderne.",
        src: "/images/photo_02.jpg",
        content: <DummyContent2 />,
    },
    {
        category: "Pergolas bois",
        title: "Une pergolas sur mesure.",
        src: "/images/photo_03.jpg",
        content: <DummyContent3 />,
    },
    {
        category: "Maison bois",
        title: "Le chalet de vacance.",
        src: "/images/photo_04.jpg",
        content: <DummyContent4 />,
    },
    // {
    //     category: "iOS",
    //     title: "Photography just got better.",
    //     src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     content: <DummyContent />,
    // },
    // {
    //     category: "Hiring",
    //     title: "Hiring for a Staff Software Engineer",
    //     src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     content: <DummyContent />,
    // },
];

export default FbHeroe;
