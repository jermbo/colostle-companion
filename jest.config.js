module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/api/$1",
		"@types/(.*)": "<rootDir>/types/$1",
	},
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
	extensionsToTreatAsEsm: [".ts"],
	moduleFileExtensions: ["ts", "js", "json", "node"],
	testMatch: ["**/api/tests/**/*.test.ts"],
	collectCoverage: true,
	coverageDirectory: "./coverage",
	coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
	collectCoverageFrom: [
		"./api/**/*.ts",
		"!./api/**/*.d.ts",
		"!./api/tests/**/*.ts",
	],
};
