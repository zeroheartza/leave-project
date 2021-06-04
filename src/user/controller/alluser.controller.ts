import { BadRequestException, Body, Controller, Delete, Get, Param, Post, ValidationPipe, Put, Res, HttpStatus, Injectable, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
import { ValidationError } from "class-validator";
import { LoginDto } from "../dto/login.dto";
import { LeaveDto } from "../dto/leave.dto";
import { UserDto } from "../dto/user.dto";
import { TokenDto } from "../dto/token.dto";
import { LogDto } from "../dto/log.dto";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../service/admin.service";
import { Response, Request, response } from 'express';

@Injectable()
@ApiTags('allusers')
@Controller('allusers')
export class alluserController {
   constructor(

      private readonly adminService: AdminService,
      private readonly jwtService: JwtService


   ) { }


   @Post('login')
   async login(
      @Body(new ValidationPipe({
         exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
      })) loginDto: LoginDto, @Res({ passthrough: true }) response: Response
   ) {

      const result = await this.adminService.findEmail(loginDto, response);
      var time = new Date();
      const datetime = time.toString()
      if (result.message !== "Invalid email") {
         if (result.message !== "Incorrect password") {


            console.log(result)
            const jwt = await this.jwtService.signAsync({ id: result.id });

            await this.adminService.saveLog("Login", result.id, "", result.message, datetime)


            return response.status(HttpStatus.OK).json({ message: "Login Success", token: jwt })
         }
         else {
            console.log(result)
            await this.adminService.saveLog("Login", result.id, "", result.message, datetime)
            return response.status(HttpStatus.OK).json({ message: "Login Fail", })
         }
      }
      else {
         console.log(result)


         return response.status(HttpStatus.OK).json({ message: "Login Fail", })
      }


   }




   @Post('user')
   async user(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) response: Response) {
      try {

         const token = tokenDto.token
         console.log(token)
         const data = await this.jwtService.verifyAsync(token);
         // console.log(data['id'].id)


         const user = await this.adminService.findId(data['id']);

         const role = user.userP[0].position
         const roleUser = this.adminService.checkRoleUser(role, response);

         console.log(user, roleUser)

         return user;
      } catch (e) {
         return {
            message: `Can't find token`
         }

      }
   }


   @Post('logout')
   async logout(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto) {
      try {
         const token = tokenDto.token
         const data = await this.jwtService.verifyAsync(token);
         var time = new Date();
         const datetime = time.toString()
         const result = this.adminService.saveLog("Logout", data['id'], "", "Logout Success", datetime)


         return {
            message: "logout Success"
         }
      } catch (e) {
         return {
            message: `Can't find token`
         }

      }
   }







   @Get('getTypeLeave')
   @ApiOkResponse()
   async getTypeLeave(@Res() res: Response
   ) {


      return this.adminService.getType(res);
   }




   @Post('checkRole')
   @ApiOkResponse()
   async checkRole(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) res: Response
   ) {
      const token = tokenDto.token
      console.log(token)
      const data = await this.jwtService.verifyAsync(token);
      const user = await this.adminService.findId(data['id']);
      const role = user.userP[0].position
      const roleUser = this.adminService.checkRoleUser(role, res);
      console.log(roleUser)
      return roleUser
   }










}