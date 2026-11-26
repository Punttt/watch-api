// Tar emot anropet, använder modellen och skickar svaret.
const Watch = require('../models/watchModel');

// GET /watches
async function getAllWatch(request, reply) {
    const watches = await Watch.getAll();
    return watches;
}

// GET /watches/:id
async function getWatchById(request, reply) {
    const {id} = request.params;
    const watch = await Watch.getById(id);

    if(!watch) {
        return reply.code(404).send({ error: `Ingen klocka med id ${id} hittades` });
    }
    return watch;
}

module.exports = { getAllWatch, getWatchById };