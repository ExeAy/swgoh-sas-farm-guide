/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        15: "5rem",
        squad: "18rem",
      },
      maxWidth: {
        "squad-card-text": "18rem",
        "squad-container-text": "36rem",
      },
    },
  },
  safelist: [
    "bg-red-100",
    "bg-red-300",
    "bg-red-500",
    "bg-lime-100",
    "bg-lime-300",
    "bg-lime-500",
    "bg-amber-100",
    "bg-amber-300",
    "bg-amber-500",
    "bg-blue-100",
    "bg-blue-300",
    "bg-blue-500",
    "bg-fuchsia-100",
    "bg-fuchsia-300",
    "bg-fuchsia-500",
    "text-indigo-800",
    "text-indigo-400",
    "text-slate-800",
    "text-slate-400",
    "text-gray-800",
  ],
  plugins: [],
}
