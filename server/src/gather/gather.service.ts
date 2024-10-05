import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGatherDto } from './dto/create-gather.dto';
import { UpdateGatherDto } from './dto/update-gather.dto';
import { LogService } from 'src/log/log.service';

@Injectable()
export class GatherService {

  constructor(private readonly logService: LogService) {}

  create(createGatherDto: CreateGatherDto,ip:string) {
    console.log(createGatherDto)
     if(!createGatherDto.lat || !createGatherDto.long){
      throw new BadRequestException("This data is invalid")
     }
     console.log(createGatherDto)
  
     const now = new Date();

     const day = String(now.getDate()).padStart(2, '0'); // Get day
     const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month (0-based, hence +1)
     const year = now.getFullYear();
     const hour = now.getHours()
     const minutes = now.getMinutes()
     const seconds = now.getSeconds()
   
     let log = `===============================\nlong: ${createGatherDto.long}\nlat: ${createGatherDto.lat}  \ntime: ${day+"."+month+"."+year+" || "+hour+":"+minutes+":"+seconds}\nplatform: ${createGatherDto.platform}\nIP: ${ip}\n\n`
     this.logService.write(log)
  }

}
