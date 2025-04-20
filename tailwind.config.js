/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: true,
		darkTheme: "dark",
		base: true,
		styled: true,
		utils: true,
		prefix: "",
		logs: false,
		themeRoot: ":root",
	},
};
