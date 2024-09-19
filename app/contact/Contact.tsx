"use client";
import { useState } from "react";

const defaultFormState = {
    name: {
        value: "",
        error: "",
    },
    email: {
        value: "",
        error: "",
    },
    message: {
        value: "",
        error: "",
    },
};
export const Contact = () => {
    const [formData, setFormData] = useState(defaultFormState);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Write your submit logic here
        console.log(formData);
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between gap-5 md:flex-row">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    value={formData.name.value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            name: {
                                value: e.target.value,
                                error: "",
                            },
                        });
                    }}
                />
                <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    value={formData.email.value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            email: {
                                value: e.target.value,
                                error: "",
                            },
                        });
                    }}
                />
            </div>
            <div>
                <textarea
                    placeholder="Your Message"
                    rows={10}
                    className="mt-4 w-full rounded-md bg-neutral-100 p-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    value={formData.message.value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            message: {
                                value: e.target.value,
                                error: "",
                            },
                        });
                    }}
                />
            </div>
            <button
                className="mt-4 w-full rounded-md bg-neutral-100 p-2 font-bold text-neutral-500"
                type="submit"
            >
                Submit{" "}
            </button>
        </form>
    );
};
