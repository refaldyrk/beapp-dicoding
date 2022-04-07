/**
 * Handler API
 */

const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
	const { title, tags, body } = request.payload;
	const id = nanoid(10);
	const createdAt = new Date().toISOString;
	const updatedAt = createdAt;

	const newNotes = { title, tags, body, id, createdAt, updatedAt };
	notes.push(newNotes);

	const isSuccess = notes.filter(note => note.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: "Success",
			message: "Note has been added",
			data: {
				id: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: "Error",
		message: "Note has not been added",
	});
	response.code(500);
	return response;
};

const getNotesHandler = () => ({
	status: "Success",
	message: "Notes has been retrieved",
	data: { notes },
});

const getNotesByIdHandler = (request, h) => {
	const { id } = request.params;

	const note = notes.filter(note => note.id === id)[0];

	if (note !== undefined) {
		return {
			status: "Success",
			message: "Note has been retrieved",
			data: { note },
		};
	}

	const response = h.response({
		status: "Error",
		message: "Note has not been retrieved",
	});
	response.code(500);
	return response;
};

const editNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const { title, tags, body } = request.payload;
	const updatedAt = new Date().toISOString();

	const index = notes.findIndex(note => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updatedAt,
		};

		const response = h.response({
			status: "Success",
			message: "Note has been updated",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "Error",
		message: "Note has not been updated",
	});
	response.code(404);
	return response;
};

const deleteNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = notes.findIndex(note => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: "Success",
			message: "Note has been deleted",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "Error",
		message: "Note has not been deleted",
	});
	response.code(404);
	return response;
};

module.exports = {
	addNoteHandler,
	getNotesHandler,
	getNotesByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
};
