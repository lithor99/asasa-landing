/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "app/app.vue",
        "app/components/**/*.{vue,js,ts}",
        "app/pages/**/*.{vue,js,ts}",
        "app/layouts/**/*.{vue,js,ts}",
        "app/plugins/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                main: "#011c39",
                sub: "#02254a", //
                primary: "#023062", // "#2666F9",
                secondary: "#0450A8",
                success: "#2ECC71",
                danger: "#E74C3C",
                error: "#c60036",
                warning: "#EFBF04",
                info: "#3498DB",
                dark: "#34495E",
                light: "#ECF0F1",
                black: "#000",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
