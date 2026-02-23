/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './*.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './script.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                'heading': ['Playfair Display', 'serif'],
                'body': ['Inter', 'sans-serif'],
            },
        },
    },
    corePlugins: {
        // Disable Tailwind's Preflight (CSS reset) so our custom styles remain intact
        preflight: false,
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                portfolioDark: {
                    "primary": "#6366f1",
                    "primary-content": "#ffffff",
                    "secondary": "#8b5cf6",
                    "secondary-content": "#ffffff",
                    "accent": "#22d3ee",
                    "accent-content": "#ffffff",
                    "neutral": "#131830",
                    "neutral-content": "#f1f5f9",
                    "base-100": "#0a0e1a",
                    "base-200": "#131830",
                    "base-300": "#1e2340",
                    "base-content": "#f1f5f9",
                    "info": "#3b82f6",
                    "success": "#10b981",
                    "warning": "#f59e0b",
                    "error": "#ef4444",
                },
            },
        ],
        darkTheme: "portfolioDark",
        base: false,
        styled: false,    // DISABLED — prevents DaisyUI component styles from conflicting with our custom CSS
        utils: true,
        logs: false,
    },
}
