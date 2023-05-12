import { OnEvent } from '@nestjs/event-emitter';
import { ListCreatedEvent } from '../events/list-created.event';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class PublishListCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    await this.queue.add('list.created', event);
  }
}
