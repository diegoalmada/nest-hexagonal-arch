import { ListsService } from './lists.service';
import { ListGatewayMemory } from './gateways/list-gateway-memory';
import { ListCreatedEvent } from './events/list-created.event';

describe('ListsService', () => {
  let service: ListsService;
  let listGatewayPersistence: ListGatewayMemory;
  let listGatewayIntegration: ListGatewayMemory;

  const eventEmitterMock = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    listGatewayPersistence = new ListGatewayMemory();
    listGatewayIntegration = new ListGatewayMemory();
    service = new ListsService(listGatewayPersistence, eventEmitterMock as any);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({
      name: 'my list',
    });
    expect(listGatewayPersistence.items).toEqual([list]);
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'list.created',
      new ListCreatedEvent(list),
    );
  });
});
