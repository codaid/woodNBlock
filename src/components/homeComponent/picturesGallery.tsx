import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
    images: string[];
    reverse?: boolean;
};

const PicturesGallery = ({ images, reverse = false }: Props) => {
    const pictureAnimation = {
        initial: { opacity: 0, y: 50, rotate: 0 },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            rotate: reverse
                ? index % 2 === 0
                    ? -3
                    : 3
                : index % 2 === 0
                ? 3
                : -3,
        }),
    };

    return (
        <div className="my-10 grid grid-cols-2 justify-items-center gap-10 md:grid-cols-3">
            {images.map((image, index) => (
                <motion.div
                    key={image}
                    variants={pictureAnimation}
                    whileInView="animate"
                    initial="initial"
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    custom={index}
                    className={
                        images.length === 3 && index === 2
                            ? "col-span-2 md:col-span-1"
                            : ""
                    }
                >
                    <Image
                        src={image}
                        width={400}
                        height={200}
                        alt="about"
                        className="block h-40 w-full rotate-3 rounded-md object-contain shadow-xl transition duration-200 hover:rotate-0 md:h-60"
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default PicturesGallery;
