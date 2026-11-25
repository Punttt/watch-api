// Importera Fastify och slå på loggning
const fastify = require('fastify')({ logger: true });

// Test-route
fastify.get('/', async () => {
  return { message: 'Watch API fungerar!' };
});

// Starta servern
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();