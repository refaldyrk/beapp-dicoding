/**
 * Main File for the Server
 * Copyright (c) 2022, The Notes Project
 */
const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
	//Config Hapi Server
	const server = Hapi.server({
		port: 3000,
		host: "localhost",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	//Setting Route
	server.route(routes);

	//Server Start
	await server.start();
	console.log("Server running on %s", server.info.uri);
};

init();
