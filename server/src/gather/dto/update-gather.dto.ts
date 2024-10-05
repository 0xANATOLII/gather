import { PartialType } from '@nestjs/mapped-types';
import { CreateGatherDto } from './create-gather.dto';

export class UpdateGatherDto extends PartialType(CreateGatherDto) {}
