"use client";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

const FbHeroe = () => {
    const cards = data.map((card, index) => (
        <Card key={card.title.replaceAll(" ", "_")} card={card} index={index} />
    ));

    return (
        <div className="size-full py-20">
            <h2 className="mx-auto max-w-7xl pl-4 font-sans text-xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl">
                Get to know your iSad.
            </h2>
            <Carousel items={cards} />
        </div>
    );
};

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14"
                    >
                        <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast
                                about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and
                            take amazing class notes. Want to convert those
                            notes to text? No problem. Langotiya jeetu ka mara
                            hua yaar is ready to capture every thought.
                        </p>
                        <Image
                            src="/images/photo_01.jpg"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="mx-auto size-full object-contain md:size-1/2"
                        />
                    </div>
                );
            })}
        </>
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
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "/images/photo_01.jpg",
        content: <DummyContent />,
    },
    {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/images/photo_02.jpg",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Launching the new Apple Vision Pro.",
        src: "/images/photo_03.jpg",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "/images/photo_04.jpg",
        content: <DummyContent />,
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
