import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RequestRepository } from '../repositories/requests';
import { Request } from 'modules/database/models/request';
import { IRequest } from 'modules/database/interfaces/request';
import { RequestValidator } from '../validators/request/request';

@Controller('/request')
export class RequestController {
  constructor(private requestRepository: RequestRepository) {}

  @Get(':userEmail')
  @ApiResponse({ status: 200, type: Request })
  public async index(@Param('userEmail') userEmail: string): Promise<IRequest[]> {
    const resultado = await this.requestRepository.index(userEmail);
    return resultado;
  }

  @Post(':userEmail')
  @ApiResponse({ status: 200, type: Request })
  public async create(
    @Param('userEmail') userEmail: string,
    @Body() createRequest: RequestValidator
  ): Promise<Request> {
    const createdRequest = await this.requestRepository.create(createRequest, userEmail);
    return createdRequest;
  }
}
