import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteDto {


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly token: string

  
  



}