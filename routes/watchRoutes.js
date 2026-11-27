// Routes – bestämmer vilka URL:er som finns och vilken controller som körs
const watchController = require('../controllers/watchController');

// Schema för validering.
const watchSchema = {
  body: {
    type: 'object',
    required: ['brand', 'model', 'price', 'is_owned'],
    properties: {
      brand: { type: 'string', minLength: 1 },
      model: { type: 'string', minLength: 1 },
      price: { type: 'string', minLength: 1 },
      is_owned: { type: 'boolean' }
    }
  }
};

async function watchRoutes(fastify) {
  fastify.get('/watches', watchController.getAllWatches);
  fastify.get('/watches/:id', watchController.getWatchById);
  fastify.post('/watches', { schema: watchSchema }, watchController.createWatch);
  fastify.put('/watches/:id', { schema: watchSchema }, watchController.updateWatch);
  fastify.delete('/watches/:id', watchController.deleteWatch);
}

module.exports = watchRoutes;