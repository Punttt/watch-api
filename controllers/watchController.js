// Tar emot anropet, använder modellen och skickar svaret.
const Watch = require('../models/watchModel');

// GET /watches
async function getAllWatches(request, reply) {
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

// POST /watches
async function createWatch(request, reply) {
    const { brand, model, price, is_owned } = request.body;
    const id = await Watch.create(brand, model, price, is_owned);

    // 201 = Created
    return reply.code(201).send({ message: 'Klockan har lagts till', id, brand, model, price, is_owned });
}

// PUT /watches/:id
async function updateWatch(request, reply) {
    const {id} = request.params;
    const { brand, model, price, is_owned } = request.body;
    const affectedRows = await Watch.update(id, brand, model, price, is_owned);

    if( affectedRows === 0 ) {
        return reply.code(404).send({ error: `Ingen klocka med id ${id} hittades` });
    }

    return { message: 'Klockan har uppdaterats', id: Number(id), brand, model, price, is_owned };
}

// DELETE /watches/:id
async function deleteWatch(request, reply) {
    const {id} = request.params;
    const affectedRows = await Watch.remove(id);

    if( affectedRows === 0 ) {
        return reply.code(404).send({ error: `Ingen klocka med id ${id} hittades` });
    }

    return { message: `Klockan med id ${id} har raderats` };
}

module.exports = { getAllWatches, getWatchById, createWatch, updateWatch, deleteWatch };