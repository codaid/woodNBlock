import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        NEXTAUTH_URL: z.string(),
        NEXTAUTH_SECRET: z.string(),
        PDF_PATH: z.string(),
        PASS_MAIL: z.string(),
        MAIL: z.string(),
        TO_MAIL: z.string(),
    },
    client: {
        // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    },
    experimental__runtimeEnv: {
        // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    },
});
