import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class IdDto {


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly Id: string

  
  



}