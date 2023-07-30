/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      width: {
        15: '5rem',
        squad: '18rem',
      },
      maxWidth: {
        'squad-container-text': '36rem',
      },
    },
  },
  safelist: [
    'bg-red-200',
    'bg-red-400',
    'bg-amber-200',
    'bg-amber-400',
    'bg-blue-200',
    'bg-blue-400',
    'text-indigo-800',
    'text-indigo-400',
    'text-slate-800',
    'text-slate-400',
    'text-gray-800',
  ],
  plugins: [],
}
