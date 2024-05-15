import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { ItemController } from './controllers/itemController';
import { ItemService } from './services/itemService';

const prisma = new PrismaClient();
const server = Fastify({ logger: true });

const itemService = new ItemService(prisma);
const itemController = new ItemController(itemService);

server.get('/items', async (request, reply) => {
  return itemController.getAllItems(request, reply);
});

server.post<{ Body: { name: string, quantity: number } }>('/items', async (request, reply) => {
  return itemController.createItem(request, reply);
});

server.put<{ Params: { id: string }, Body: { name?: string, quantity?: number } }>('/items/:id', async (request, reply) => {
  return itemController.updateItem(request, reply);
});

server.delete<{ Params: { id: string } }>('/items/:id', async (request, reply) => {
  return itemController.deleteItem(request, reply);
});

const start = async () => {
  try {
    await prisma.$connect();
    await server.listen(3000);
    server.log.info('Server listening on port 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();