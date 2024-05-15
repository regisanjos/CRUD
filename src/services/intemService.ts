
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../customError';

export class ItemService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllItems(): Promise<any[]> {
    return await this.prisma.item.findMany();
  }

  async createItem(data: { name: string; quantity: number }): Promise<any> {
    return await this.prisma.item.create({ data });
  }

  async updateItem(id: number, data: { name?: string; quantity?: number }): Promise<any> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new CustomError(404, 'Item not found');
    }
    return await this.prisma.item.update({ where: { id }, data });
  }

  async deleteItem(id: number): Promise<void> {
    await this.prisma.item.delete({ where: { id } });
  }
}