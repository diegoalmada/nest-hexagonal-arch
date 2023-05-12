import { ListGatewayInterface } from './list-gateway-interface';
import { List } from '../entities/list.entity';

export class ListGatewayMemory implements ListGatewayInterface {
  items: List[] = [];

  async create(list: List): Promise<List> {
    list.id = this.items.length + 1;
    this.items.push(list);
    return list;
  }

  async findAll(): Promise<List[]> {
    return this.items;
  }

  async findById(id: number): Promise<List> {
    const list = this.items.find((item) => item.id == id);
    if (!list) {
      throw new Error('list not found');
    }

    return list;
  }
}
