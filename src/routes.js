/**
 * Routing For The APIs
 */

const {
	addNoteHandler,
	getNotesHandler,
	getNotesByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
} = require("./handler");

const routes = [
	{
		method: "POST",
		path: "/api/v1/notes",
		handler: addNoteHandler,
	},
	{
		method: "GET",
		path: "/api/v1/notes",
		handler: getNotesHandler,
	},
	{
		method: "GET",
		path: "/api/v1/notes/{id}",
		handler: getNotesByIdHandler,
	},
	{
		method: "PUT",
		path: "/api/v1/notes/{id}",
		handler: editNoteByIdHandler,
	},
	{
		method: "DELETE",
		path: "/api/v1/notes/{id}",
		handler: deleteNoteByIdHandler,
	},
];

module.exports = routes;
