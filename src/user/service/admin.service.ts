
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { DeleteDto } from "../dto/delete.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { LeaveDto } from "../dto/leave.dto";
import { UserProfileDto } from "../dto/userProfile.dto";

export class AdminService extends UserService {
    constructor() {
        super()
    }

    createAdmin() {
        const id = Math.floor(Math.random() * 10000) + 1;
        console.log(id)
        const json = `{  "firstName":"admin" ,
                        "lastName":"admin" ,
                        "email":"admin@admin.com",
                        "password":"admin1234",
                        "staffId":"${id}",
                        "phone":"",
                        "position" :"Administrator",
                        "department":"",
                        "startingDate":"",
                        "pin":""
          }`;
        const admin = JSON.parse(json);
        console.log(admin.startDate);
        return this.create(admin)
    }


    createUser(userDto: UserDto, res: any) {

        return this.addUser(userDto, res)
    }
    editUser(userProfileDto: UserProfileDto, res: any) {

        return this.editUserProfile(userProfileDto, res)
    }

    

    deleteUser(deleteDto: DeleteDto, res: any) {

        return this.delUser(+deleteDto.userId, res)
    }

    addLeave(leaveDto: LeaveDto, res: any) {

        return this.addLeaveUser(leaveDto, res)
    }

    findEmail(loginDto: LoginDto, res: any) {
        return this.findemailUser(loginDto, res)
    }

    findId(id: string) {
        return this.findidUser(id)
    }

    logAll() {
        return this.findLogAll()
    }

    
    logId(id: string) {
        return this.findLogId(id)
    }

    getlookUp(res: any) {
        return this.getLookUp(res)
    }

    getType(res: any) {
        return this.getTypeLeave(res)
    }
    

    getUserId(id: string, res: any) {
        return this.getUserWhereId(id,res)
    }
    getProfileId(id: string, res: any) {
        return this.getProfileWhereId(id, res)
    }


    checkRoleUser(role: string, res: any) {
        return this.checkroleUser(role, res)
    }

    getuser(res: any) {
        return this.getUser(res)
    }



    getProfileUsers(res: any) {
        return this.getProfile(res)
    }
    getLeaveUsers(res: any) {
        return this.getLeave(res)
    }

    saveLog(category: string, user_id: string, leave_id: string,comment:string, time: string) {
        return this.saveLogUser(category, user_id, leave_id,comment, time)
    }




}