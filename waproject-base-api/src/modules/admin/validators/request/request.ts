import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IRequest } from 'modules/database/interfaces/request';

export class RequestValidator implements Omit<IRequest, 'user' | 'id'> {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ required: true, type: 'string', minLength: 4, maxLength: 80 })
  public title: string;

  @ApiProperty({ required: false, type: 'string' })
  public id?: string;

  @ApiProperty({ required: false, type: 'string' })
  public userEmail?: string;

  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public description: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'integer' })
  public quantity: number;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'decimal' })
  public price: number;
}
