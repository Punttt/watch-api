// Routes – bestämmer vilka URL:er som finns och vilken controller som körs
const watchController = require('../controllers/watchController');

async function watchRoutes(fastify) {
  fastify.get('/watches', watchController.getAllWatches);
  fastify.get('/watches/:id', watchController.getWatchById);
}

module.exports = watchRoutes;