/** @type {import('prettier').Config} */
const config = {
	useTabs: true,
	tabWidth: 2,
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};

export default config;
