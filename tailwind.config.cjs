/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      width: {
        15: '5rem',
        squad: '18rem',
      },
    },
  },
  safelist: [
    'bg-red-200',
    'bg-red-400',
    'text-indigo-800',
    'text-indigo-400',
    'text-slate-800',
    'text-slate-400',
    'text-gray-800',
  ],
  plugins: [],
}
