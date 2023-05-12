import { Job } from 'bull';
import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';
import { Inject } from '@nestjs/common';
import { ListCreatedEvent } from '../events/list-created.event';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('ListGatewayIntegration')
    private listGatewayInterface: ListGatewayInterface,
  ) {}

  @Process('list.created')
  async handle(job: Job<ListCreatedEvent>) {
    const event = job.data;
    await this.listGatewayInterface.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log('CreateListInCrmJob', error);
  }
}
