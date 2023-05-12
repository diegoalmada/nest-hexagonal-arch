import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { ListGatewayHttp } from './gateways/list-gateway-http';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { PublishListCreatedListener } from './listeners/publish-list-created.listener';
import { CreateListInCrmJob } from './jobs/create-list-in-crm.job';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 1 },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewayHttp,
    ListGatewaySequelize,
    PublishListCreatedListener,
    CreateListInCrmJob,
    {
      provide: 'ListGatewayPersistence',
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListGatewayIntegration',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
