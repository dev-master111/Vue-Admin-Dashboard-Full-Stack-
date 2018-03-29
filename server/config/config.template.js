"use strict";

let path = require("path");
let pkg = require("./package.json");

module.exports = {
	
	// Secret for ID hashing
	hashSecret: "{{hashSecret}}",

	// Secret for session hashing
	sessionSecret: "{{sessionSecret}}",

	// Application settings
	app: {
	},

	// ip: process.env.NODE_IP || "0.0.0.0",
	// port: process.env.NODE_PORT || 3000,

	// dataFolder: path.join(global.rootPath, "data"),
	// logFolder: path.join(global.rootPath, "logs"),

	// Database (Mongo) settings
	db: {
		// uri: process.env.MONGO_URI,
		options: {
			user: process.env.MONGO_USERNAME || "",
			pass: process.env.MONGO_PASSWORD || ""
		}
	},

	// Redis settings for caching
	redis: {
		enabled: false,
		uri: process.env.REDIS_URI || "redis://localhost:6379",
		options: null
	},	

	// Mail sending settings
	mailer: {
	},

	// Features of application
	features: {
		disableSignUp: false,
		verificationRequired: true
	},	

	// Social authentication (OAuth) keys
	authKeys: {

		google: {
			clientID: null,
			clientSecret: null
		},

		facebook: {
			clientID: null,
			clientSecret: null
		},

		github: {
			clientID: null,
			clientSecret: null
		},

		twitter: {
			clientID: null,
			clientSecret: null
		}		
	},

	// Logging settings
	logging: {
		
		console: {
		},

		file: {
			enabled: false,
		},

		graylog: {
			enabled: false
		},

		papertrail: {
			enabled: false,
			host: null,
			port: null,
			level: "debug",
			program: "VueCMS"
		},

		logentries: {
			enabled: false,
			token: null
		},

		loggly: {
			enabled: false,
			token: null,
			subdomain: null
		},
		
		logsene: {
			enabled: false,
			token: null
		},
		
		logzio: {
			enabled: false,
			token: null
		}
		
	}

};

