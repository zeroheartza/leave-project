import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly token: string


  



}