
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/carro', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createCarro(body);
    return reply.status(201).send();
})

// READE
server.get('/carro', async () => {
    const carro = await databasePostgres.listcarro();
    return carro;
});

// UPDATE
server.put('/carro/:placa', async (request, reply) => {
    const userPlaca = request.params.placa;
    const body = request.body;
    await databasePostgres.updateCarro(userPlaca, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/carro/:placa', async (request, reply) => {
    const userPlaca = request.params.placa;
    await databasePostgres.deleteCarro(userPlaca);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});
