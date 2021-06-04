import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly password: string

  



}