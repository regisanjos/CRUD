import { FastifyRequest, FastifyReply } from 'fastify';
import { ItemService } from '../services/itemService';
import { CustomError } from '../customError';

export class ItemController {
  private itemService: ItemService;

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  async getAllItems(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const items = await this.itemService.getAllItems();
      reply.send(items);
    } catch (error) {
      reply.code(500).send({ message: 'Internal server error' });
    }
  }

  async createItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const newItem = await this.itemService.createItem(request.body);
      reply.code(201).send(newItem);
    } catch (error) {
      reply.code(500).send({ message: 'Internal server error' });
    }
  }

  async updateItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params;
      const { name, quantity } = request.body;
      const updatedItem = await this.itemService.updateItem(parseInt(id, 10), { name, quantity });
      reply.send(updatedItem);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.code(error.statusCode).send({ message: error.message });
      } else {
        reply.code(500).send({ message: 'Internal server error' });
      }
    }
  }

  async deleteItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params;
      await this.itemService.deleteItem(parseInt(id, 10));
      reply.send({ message: 'Item deleted successfully' });
    } catch (error) {
      reply.code(500).send({ message: 'Internal server error' });
    }
  }
}