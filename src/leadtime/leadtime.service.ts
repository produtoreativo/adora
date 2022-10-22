import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class LeadtimeService {

  constructor(
    @Inject('TYPEDORM')
    private entityManager,
  ) {}

  async createEvent(payload: any) {
    const created = await this.entityManager.create(payload);
    console.log(created);
    return {};
  }

}