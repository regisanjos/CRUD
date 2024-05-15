import { FastifyInstance } from 'fastify';
import { getItem, createItem, updateItem, deleteItem } from '../controllers/itemController';

export default async function itemRoutes(fastify: FastifyInstance) {
    fastify.get('/items', getItem);
    fastify.post('/items', createItem);
    fastify.put('/items/:id', updateItem);
    fastify.delete('/items/:id', deleteItem);
}