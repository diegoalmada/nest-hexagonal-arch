import { ListGatewayInterface } from './list-gateway-interface';
import { List } from '../entities/list.entity';
import { ListModel } from '../entities/list.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListGatewaySequelize implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel)
    private listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    const newList = await this.listModel.create(list);
    list.id = newList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const listModels = await this.listModel.findAll();
    return listModels.map(
      (listModel) => new List(listModel.name, listModel.id),
    );
  }

  async findById(id: number): Promise<List> {
    const listModel = await this.listModel.findByPk(id);
    if (!listModel) {
      throw new Error('list not found');
    }

    return new List(listModel.name, listModel.id);
  }
}
