import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LogDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly category: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly leaveId: string

   
    @IsString()
    @ApiProperty()
    readonly comment: string
  

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly time: string





}