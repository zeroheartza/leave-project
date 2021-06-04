import { BadRequestException, Body, Controller, Delete, Get, Param, Post, ValidationPipe, Put, Res, HttpStatus, Injectable, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
import { ValidationError } from "class-validator";
import { LoginDto } from "../dto/login.dto";
import { DeleteDto } from "../dto/delete.dto";
import { LeaveDto } from "../dto/leave.dto";
import { UserDto } from "../dto/user.dto";
import { UserProfileDto } from "../dto/userProfile.dto";
import { TokenDto } from "../dto/token.dto";
import { IdDto } from "../dto/id.dto";
import { LogDto } from "../dto/log.dto";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../service/admin.service";
import { Response, Request, response } from 'express';
import { enumRoleUser } from "../../core/enum";
import { resolveConfig } from "prettier";

@Injectable()
@ApiTags('Administrator')
@Controller('admin')
export class adminController {

   constructor(

      private readonly adminService: AdminService,
      private readonly jwtService: JwtService


   ) { }



   // **************** Create *********************

   @Post('createAdmin')
   @ApiOkResponse()
   async createAdmin(
   ) {

      return this.adminService.createAdmin();
   }

   @Post('addLeave')
   async addLeave(
      @Body(new ValidationPipe({
         exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
      })) leaveDto: LeaveDto, @Res({ passthrough: true }) response: Response
   ) {

      const result = await this.adminService.addLeaveUser(leaveDto, response);



      return response.status(HttpStatus.OK).json({ message: result })


   }


   @Post('createUser')
   @ApiOkResponse()
   async createUser(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) userDto: UserDto, @Res({ passthrough: true }) res: Response
   ) {
      try {
         console.log(userDto)
         const token = userDto.token
         const data = await this.jwtService.verifyAsync(token);

         const user = await this.adminService.findId(data['id']);


         const role = user.userP[0].position
         const roleUser = this.adminService.checkRoleUser(role, res);


         if (roleUser == enumRoleUser.admin) {
            console.log(userDto)
            const user = await this.adminService.createUser(userDto, res);
            console.log(user)

            var time = new Date();
            const datetime = time.toString()

            const result = this.adminService.saveLog("Add User", user.id.toString(), "", `Add user ,name  ${userDto.firstName} ${userDto.lastName}`, datetime)
            return res.status(HttpStatus.OK).json({ message: user.message })
         }
         else {
            return res.status(HttpStatus.OK).json({ message: "you are not admin" })
         }
      } catch (e) {
         return {
            message: `Can't find token`
         }

      }


   }



   // **************** Read *********************

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

   @Get('getUser')
   @ApiOkResponse()
   async getUsers(@Res() res: Response
   ) {


      return this.adminService.getuser(res);
   }


   @Get('getUserProfile')
   @ApiOkResponse()
   async getProfileUsers(@Res() res: Response
   ) {


      return this.adminService.getProfileUsers(res);
   }


   @Post('getProfileId')
   @ApiOkResponse()
   async getProfileId(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) idDto: IdDto, @Res({ passthrough: true }) res: Response
   ) {


      return this.adminService.getProfileId(idDto.Id, res);
   }

   @Get('getUserleave')
   @ApiOkResponse()
   async getUserleave(@Res() res: Response
   ) {


      return this.adminService.getLeaveUsers(res);
   }


   @Post('getLogAll')
   @ApiOkResponse()
   async getLogAll(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) res: Response
   ) {

      try {
         const token = tokenDto.token
         const data = await this.jwtService.verifyAsync(token);

         const user = await this.adminService.findId(data['id']);


         const role = user.userP[0].position
         const roleUser = this.adminService.checkRoleUser(role, res);


         if (roleUser == enumRoleUser.admin) {
            return this.adminService.logAll();

         }
         else {
            return res.status(HttpStatus.OK).json({ message: "you are not admin" })
         }
      } catch (e) {
         return {
            message: `Can't find token`
         }

      }





   }

   @Post('getLogId')
   @ApiOkResponse()
   async getPrgetLogIdofileId(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) res: Response
   ) {

      try {
         const token = tokenDto.token
         const data = await this.jwtService.verifyAsync(token);

         const user = await this.adminService.findId(data['id']);


         const role = user.userP[0].position
         const roleUser = this.adminService.checkRoleUser(role, res);


         if (roleUser == enumRoleUser.admin) {
            return this.adminService.logId(user.user[0].userId.toString());

         }
         else {
            return res.status(HttpStatus.OK).json({ message: "you are not admin" })
         }
      } catch (e) {
         return {
            message: `Can't find token`
         }

      }
   }



   @Get('lookUp')
   @ApiOkResponse()
   async getLookUp(@Res() res: Response
   ) {


      return this.adminService.getlookUp(res);
   }


    // **************** Update *********************



   @Post('editUser')
   @ApiOkResponse()
   async editUser(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) userProfileDto: UserProfileDto, @Res({ passthrough: true }) res: Response
   ) {
      console.log(userProfileDto)

      return this.adminService.editUser(userProfileDto, res);


   }


    // **************** Delete *********************

   @Post('deleteUser')
   @ApiOkResponse()
   async deleteUser(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) deleteDto: DeleteDto, @Res({ passthrough: true }) res: Response
   ) {
      try {
         console.log(deleteDto)

         const token = deleteDto.token
         console.log(token)

         const data = await this.jwtService.verifyAsync(token);

         const user = await this.adminService.findId(data['id']);


         const role = user.userP[0].position
         const roleUser = this.adminService.checkRoleUser(role, res);


         if (roleUser == enumRoleUser.admin) {
            var time = new Date();
            const datetime = time.toString()
            const userfind = await this.adminService.getProfileId(deleteDto.userId, res)

            const result = this.adminService.saveLog("Delete User", user.user[0].userId.toString(), "", `delete user ,name  ${userfind.firstName} ${userfind.lastName}`, datetime)

            return this.adminService.deleteUser(deleteDto, res);

         }
         else {

            return res.status(HttpStatus.OK).json({ message: "you are not admin" })
         }
      } catch (e) {
         return {

            message: `Can't find token`
         }

      }





   }








}