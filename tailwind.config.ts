import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marca: { DEFAULT: "#1B396A", claro: "#E8EEF7", acento: "#2E7D5B" },
      },
    },
  },
  plugins: [],
} satisfies Config;
