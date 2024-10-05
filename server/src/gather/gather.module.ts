import { Module } from '@nestjs/common';
import { GatherService } from './gather.service';
import { GatherController } from './gather.controller';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [GatherController],
  providers: [GatherService,LogService],
})
export class GatherModule {}
