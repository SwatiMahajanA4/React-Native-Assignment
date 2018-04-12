const Hapi = require('hapi');

const server = new Hapi.Server({
  host: '127.0.0.1',
  port: '8080',
});

async function main() {
  await server.register([{
    plugin: require('./shifts-mock-api'),
    route: { prefix: '/shifts' },
  }]);

  await server.start();

  console.info(`✅  API server is listening at ${server.info.uri.toLowerCase()}`);
}

main();