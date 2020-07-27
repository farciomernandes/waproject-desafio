import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IRequest } from '../interfaces/request';
import { User } from './user';

export class Request extends Model implements IRequest {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public userEmail: string;

  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'decimal' })
  public price: number;

  @ApiProperty({ type: 'integer' })
  public quantity: number;

  public static get tableName(): string {
    return 'Request';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('firstName', 'lastName', 'email'),
        join: {
          from: 'User.email',
          to: 'Request.userEmail'
        }
      }
    };
  }

  public $formatJson(data: IRequest): IRequest {
    return data;
  }
}
