const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
	extends: ["react-app", "prettier"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": ["error", prettierOptions],
		// 'no-unused-vars': 0,
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
	},
	overrides: [
		{
			files: ["src/**/*.ts?(x)"],
			rules: {
				"prettier/prettier": ["warn", prettierOptions],
				// 'no-unused-vars': 0,
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": "off",
			},
		},
	],
};
