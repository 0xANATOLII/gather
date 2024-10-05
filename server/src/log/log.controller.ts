import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  getOptions() {
    return this.logService.getOptions();
  }

  @Get(':name')
  getFile(@Param('name') name: string) {
    return this.logService.getData(name);
  }

}
