import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { GatherService } from './gather.service';
import { CreateGatherDto } from './dto/create-gather.dto';
import { UpdateGatherDto } from './dto/update-gather.dto';
import { LogService } from 'src/log/log.service';
import { Request } from 'express';

@Controller('gather')
export class GatherController {
  constructor(private readonly gatherService: GatherService, 
    private readonly logservice:LogService
  ) {}

  @Post()
  create(@Body() createGatherDto: CreateGatherDto, @Req() request: Request) {

    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress; // For proxied requests
    console.log(`Incoming request from IP: ${ip}`);
    console.log(`Incoming request from IP___: ${request.ip}`);
    let sdip:string = (ip.toString() || request.ip.toString())
    return this.gatherService.create(createGatherDto,sdip);
  }
  @Get()
  ret(){
    return "IN WORK!";
  }
}
