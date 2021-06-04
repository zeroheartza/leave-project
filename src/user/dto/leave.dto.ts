import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LeaveDto {

    

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly staffId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly position: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly department: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly location: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly phone : string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly typeLeave: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly dateLeave: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly reason: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly date: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly status: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly reasonAdmin: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly dateApproved: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly record: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly comment: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly pin: string






}