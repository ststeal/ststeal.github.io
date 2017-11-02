module.exports = {
	"env": {
		"browser": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"no-console": 0,
		"indent": [
			"error",
			"tab",
			{"SwitchCase": 1}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		]
	}
};