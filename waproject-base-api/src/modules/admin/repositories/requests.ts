import { Injectable } from '@nestjs/common';
import { IRequest } from 'modules/database/interfaces/request';
import { Request } from 'modules/database/models/request';
import { Transaction } from 'objection';
import { RequestValidator } from '../validators/request/request';
import crypto from 'crypto';

@Injectable()
export class RequestRepository {
  public async create(model: RequestValidator, userEmail: string, transaction?: Transaction): Promise<Request> {
    const id = crypto.randomBytes(4).toString('HEX');
    const createRequest = {
      userEmail,
      id,
      ...model
    };
    const createdRequest = await Request.query(transaction).insertAndFetch(createRequest);
    return createdRequest;
  }

  public async index(userEmail: string, transaction?: Transaction): Promise<IRequest[]> {
    const requestList = await Request.query(transaction)
      .where('userEmail', userEmail)
      .join('User', 'User.email', '=', 'userEmail')
      .select(['description', 'price', 'quantity', 'title', 'User.firstName', 'User.lastName']);
    return requestList;
  }
}
