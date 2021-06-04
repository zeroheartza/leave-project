import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly token: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly firstName: string
    


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly lastName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly password: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly staffId: string


    @IsString()
    @ApiProperty()
    readonly phone: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly position: string


    @IsString()
    @ApiProperty()
    readonly department: string


    @IsString()
    @ApiProperty()
    readonly startingDate: string




}