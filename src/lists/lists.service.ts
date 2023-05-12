import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListGatewayInterface } from './gateways/list-gateway-interface';
import { List } from './entities/list.entity';
import { ListCreatedEvent } from './events/list-created.event';
import { EventEmitter } from 'events';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListGatewayPersistence')
    private listGatewayPersistence: ListGatewayInterface,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = await this.listGatewayPersistence.create(
      new List(createListDto.name),
    );
    this.eventEmitter.emit('list.created', new ListCreatedEvent(list));

    return list;
  }

  findAll() {
    return this.listGatewayPersistence.findAll();
  }

  async findOne(id: number) {
    const list = await this.listGatewayPersistence.findById(id);
    if (!list) {
      throw new Error('list not found');
    }
    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
