import type { Config } from "tailwindcss";

const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const addVariablesForColors = ({ addBase, theme }: any) => {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
};

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                color_primary: {
                    DEFAULT: "hsl(var(--color-primary))",
                    foreground: "hsl(var(--color-primary-foreground))",
                    light: "hsl(var(--color-primary-light))",
                },
                color_secondary: {
                    DEFAULT: "hsl(var(--color-secondary))",
                    foreground: "hsl(var(--color-secondary-foreground))",
                },
                color_light: {
                    DEFAULT: "hsl(var(--color-light))",
                },
                color_dark: {
                    DEFAULT: "hsl(var(--color-dark))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                aurora: "aurora 60s linear infinite",
                pulse: "pulse var(--duration) ease-out infinite",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                aurora: {
                    from: {
                        backgroundPosition: "50% 50%, 50% 50%",
                    },
                    to: {
                        backgroundPosition: "350% 50%, 350% 50%",
                    },
                },
                pulse: {
                    "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
                    "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

export default config;
