import { ListGatewayInterface } from './list-gateway-interface';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { List } from '../entities/list.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    lastValueFrom(
      this.httpService.post('lists', {
        name: list.name,
      }),
    );

    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get<any[]>('lists'));
    return data.map((d) => new List(d.name, d.id));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.get<any>(`lists/${id}`),
    );
    return data.find((d) => new List(d.name, d.id));
  }
}
