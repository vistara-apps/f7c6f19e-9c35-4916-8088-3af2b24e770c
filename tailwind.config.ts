import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // BlockVideo Design System Colors
        primary: "hsl(var(--color-primary))",
        accent: "hsl(var(--color-accent))",
        bg: "hsl(var(--color-bg))",
        surface: "hsl(var(--color-surface))",
        textPrimary: "hsl(var(--color-text-primary))",
        textSecondary: "hsl(var(--color-text-secondary))",
        fg: "hsl(var(--color-text-primary))", // Alias for textPrimary

        // Legacy shadcn/ui colors for compatibility
        background: "hsl(var(--color-bg))",
        foreground: "hsl(var(--color-text-primary))",
        card: {
          DEFAULT: "hsl(var(--color-surface))",
          foreground: "hsl(var(--color-text-primary))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-bg))",
          foreground: "hsl(var(--color-text-secondary))",
        },
        border: "hsl(var(--color-accent) / 0.2)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      spacing: {
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
