import { getConnection } from "typeorm"
import { UserDto } from "../dto/user.dto"
import { tbUser } from "../entities/tbUser.entity"
import { tbLog } from "../entities/tbLog.entity"
import { tbUserProfile } from "../entities/tbUserProfile"
import * as bcrypt from 'bcrypt';
import { HttpStatus } from "@nestjs/common";
import { Response, Request, response } from 'express';
import { Not, MoreThan, Equal } from "typeorm";
import { LoginDto } from "../dto/login.dto";
import { LeaveDto } from "../dto/leave.dto";
import { LogDto } from "../dto/log.dto";
import { UserProfileDto } from "../dto/userProfile.dto";
import { enumRoleUser } from "../../core/enum";

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { tbLeave } from "../entities/tbLeave.entity"
import { notContains } from "class-validator"


export class UserService {
    constructor() { }
    // @Cron('*/60 * * * * *')
    // runEvery10Seconds() {
    //     console.log('Every 60 seconds');
    // }

    // **************** Create *********************


    async addLeaveUser(leaveDto: LeaveDto, res: any) {
        let user = new tbLeave()
        console.log(leaveDto)
        user.name = leaveDto.name
        user.staffId = leaveDto.staffId
        user.position = leaveDto.position
        user.department = leaveDto.department
        user.location = leaveDto.location
        user.phone = leaveDto.phone
        user.typeLeave = leaveDto.typeLeave
        user.dateLeave = leaveDto.dateLeave
        user.reason = leaveDto.reason
        user.date = leaveDto.date
        user.status = leaveDto.status
        user.reasonAdmin = leaveDto.reasonAdmin
        user.dateApproved = leaveDto.dateApproved
        user.record = leaveDto.record
        user.comment = leaveDto.comment
        user.pin = leaveDto.pin
        user = await getConnection().getRepository(tbLeave).save(user)
        return user



    }

    async addUser(userDto: UserDto, res: any) {
        console.log(userDto)
        console.log(userDto.startingDate)
        const result1 = await getConnection().getRepository(tbUser).find({ where: { email: userDto.email } })
        const result2 = await getConnection().getRepository(tbUserProfile).find({ where: { staffId: userDto.staffId } })
        const result3 = await getConnection().getRepository(tbUserProfile).find({ where: { firstName: userDto.firstName } })
        const result4 = await getConnection().getRepository(tbUserProfile).find({ where: { phone: userDto.phone } })
        if (result1.length === 0) {
            if (result2.length === 0) {
                if (result3.length !== 0) {

                    if (result3[0].lastName == userDto.lastName) {
                        return { id: "", message: "Name with used" }
                    }
                }
                if (result4.length !== 0) {
                    return { id: "", message: "Phone with used" }
                }
                let user = new tbUser()
                let userP = new tbUserProfile()

                user.email = userDto.email
                const hashedPassword = await bcrypt.hash(userDto.password, 12)
                userP.firstName = userDto.firstName
                userP.lastName = userDto.lastName
                user.password = hashedPassword
                userP.staffId = userDto.staffId
                userP.phone = userDto.phone
                userP.position = userDto.position
                userP.department = userDto.department
                userP.startingDate = userDto.startingDate
                userP.pin = ""
                user = await getConnection().getRepository(tbUser).save(user)
                userP.userId = user.userId
                userP = await getConnection().getRepository(tbUserProfile).save(userP)

                return { id: user.userId, message: "Add User Success" }
            }
            else {
                return { id: "", message: "StaffID is used" }

            }
        }
        else {
            return { id: "", message: "Email is used" }
        }


    }


    async saveLogUser(category: string, user_id: string, leave_id: string, comment: string, time: string) {
        let user = new tbLog()
        user.category = category
        user.userId = user_id
        user.leaveId = leave_id
        user.comment = comment
        user.time = time
        user = await getConnection().getRepository(tbLog).save(user)
        return

    }


    async create(admin: any) {
        console.log(admin)
        console.log(admin.startingDate)
        const result = await getConnection().getRepository(tbUser).find({ where: { email: admin.email } })
        if (result.length === 0) {
            let user = new tbUser()
            let userP = new tbUserProfile()

            user.email = admin.email
            const hashedPassword = await bcrypt.hash(admin.password, 12)
            user.password = hashedPassword
            userP.staffId = admin.staffId
            userP.firstName = admin.firstName
            userP.lastName = admin.lastName
            userP.phone = admin.phone
            userP.position = admin.position
            userP.department = admin.department
            userP.startingDate = admin.startingDate
            userP.pin = admin.pin
            user = await getConnection().getRepository(tbUser).save(user)
            userP.userId = user.userId

            userP = await getConnection().getRepository(tbUserProfile).save(userP)
            console.log('result', user, userP)
            return { user, userP }


        }

        else {
            console.log('result', 'Email is in use')

            return result

        }


    }


    // **************** Read *********************









    async findidUser(id: string) {

        const user = await getConnection().getRepository(tbUser).find({ where: { userId: id } })
        const userP = await getConnection().getRepository(tbUserProfile).find({ where: { userId: id } })

        console.log(user)
        console.log(userP)
        return { user, userP }



    }


    async findLogId(id: string) {

        const user = await getConnection().getRepository(tbLog).find({ where: { userId: id } })


        console.log(user)

        return { user }



    }

    async findLogAll() {

        const user = await getConnection().getRepository(tbLog).find()


        console.log(user)

        return { user }



    }

    async getUser(res: any) {


        const result = await getConnection().getRepository(tbUser).find()
        // console.log(result[0].password)
        console.log(result)
        return res.status(HttpStatus.OK).json({ message: result })



    }



    async getProfile(res: any) {


        const result = await getConnection().getRepository(tbUserProfile).find({ "position": Not(Equal("Administrator")) })

        var Arr = [];
        for (let i = 0; i < result.length; i++) {

            Arr.push({ "number": i, "userId": result[i].userId, "staffId": result[i].staffId, "name": result[i].firstName + " " + result[i].lastName, "firstName": result[i].firstName, "lastName": result[i].lastName, "department": result[i].department, "position": result[i].position, "phone": result[i].phone })
        }


        console.log(Arr)

        return res.status(HttpStatus.OK).json({ message: Arr })



    }


    async getProfileWhereId(id: string, res: any) {
        console.log("id", id)

        const result = await getConnection().getRepository(tbUserProfile).findOne({ where: { userId: id } })

        console.log("result", result)
        return result



    }

    getUserWhereId(id: string, res: any) {


        const result = getConnection().getRepository(tbUser).findOne({ where: { userId: id } })


        return result



    }



    async getLeave(res: any) {


        const result = await getConnection().getRepository(tbLeave).find()

        var Arr = [];
        for (let i = 0; i < result.length; i++) {

            Arr.push({ "number": i, "leaveId": result[i].leaveId, "name": result[i].name, "department": result[i].department, "position": result[i].position, "status": result[i].status, "date": result[i].date })
        }


        console.log(result)
        return res.status(HttpStatus.OK).json({ message: Arr })



    }


    async findemailUser(loginDto: LoginDto, res: any) {


        const result = await getConnection().getRepository(tbUser).find({ where: { email: loginDto.email } })

        if (result.length === 0) {

            return { id: "", message: "Invalid email" }


        }
        else {
            if (!await bcrypt.compare(loginDto.password, result[0].password)) {
                return { id: result[0].userId.toString(), message: "Incorrect password" }
            }
            else {

                return { id: result[0].userId.toString(), message: "Login Success" }
            }

        }


    }

    async getLookUp(res: any) {

        const data =

        {
            "Position": ["UX Designer",
                "Web Designer",
                "Graphic Designer",
                "Product Innovation Associate",
                "Digital Marketing Associate",
                "Marketing Specilist (Content Writer)",
                "Social Innovation Associate",
                "Business Relationship Associate",
                "Business Investment Associate",
                "Business Secretary",
                "Finance & Invesment Associate",
                "Head of Developer",
                "Full Stack Developer",
                "Front End Developer",
                "Back End Developer",
                "HR Executive",
                "Accounting Executive",
                "Executive Admin Secretary"
            ],
            "Department": ["Business Team",
                "Developer Team",
                "Operation Team",
                "Marketing Team",
                "Innovation Team",
                "-"
            ]
        }

        return res.status(HttpStatus.OK).json(data)
    }





    async getTypeLeave(res: any) {

        const data =

        {
            "Type": ["ลาป่วย / Sick leave",
                "ลาพักร้อน / Annual leave",
                "ลากิจ / Business leave",
                "ลาโดยไม่รับค้าจ้าง / Leave without pay",
                "ลาหยุดทดแทน / Off in lieu",
                "อื่นๆ (ระบุ) / Others"
            ]
        }

        return res.status(HttpStatus.OK).json(data)
    }



    checkroleUser(role: string, res: any) {
        var roleStaff = ["UX Designer",
            "Web Designer",
            "Graphic Designer",
            "Product Innovation Associate",
            "Digital Marketing Associate",
            "Marketing Specilist (Content Writer)",
            "Social Innovation Associate",
            "Business Relationship Associate",
            "Business Investment Associate",
            "Business Secretary",
            "Finance & Invesment Associate",
            "Full Stack Developer",
            "Front End Developer",
            "Back End Developer",
            "Accounting Executive",
            "Executive Admin Secretary"]

        var roleSuper = ["Head of Developer"]

        var roleHr = ["HR Executive"]

        var roleAdmin = ["Administrator"]
        if (roleStaff.includes(role)) {
            const roleUser = enumRoleUser.staff
            return roleUser
        }
        if (roleSuper.includes(role)) {
            const roleUser = enumRoleUser.super
            return roleUser
        }
        if (roleHr.includes(role)) {
            const roleUser = enumRoleUser.HR
            return roleUser
        }
        if (roleAdmin.includes(role)) {
            const roleUser = enumRoleUser.admin
            // console.log('servie',roleUser)
            return roleUser
        }


    }



    // **************** Update *********************



    async editUserProfile(userProfileDto: UserProfileDto, res: any) {
        const num = +userProfileDto.userId
        console.log(userProfileDto.userId)


        const result1 = await getConnection().getRepository(tbUserProfile).find({
            userId: Not(Equal(num)),
            staffId: (Equal(userProfileDto.staffId))
        })
        const result2 = await getConnection().getRepository(tbUserProfile).find({
            userId: Not(Equal(num)),
            firstName: (Equal(userProfileDto.firstName)),
            lastName: (Equal(userProfileDto.lastName))
        })
        const result3 = await getConnection().getRepository(tbUserProfile).find({
            userId: Not(Equal(num)),
            phone: (Equal(userProfileDto.phone))
        })


        if (result1.length === 0) {
            if (result2.length === 0) {
                if (result3.length === 0) {
                    const user = await getConnection().getRepository(tbUserProfile).find({ where: { userId: userProfileDto.userId } })
                    let userP = new tbUserProfile()


                    userP.profileId = user[0].profileId
                    userP.firstName = userProfileDto.firstName
                    userP.lastName = userProfileDto.lastName
                    userP.staffId = userProfileDto.staffId
                    userP.phone = userProfileDto.phone
                    userP.position = userProfileDto.position
                    userP.department = userProfileDto.department
                    userP.startingDate = user[0].startingDate
                    userP.userId = user[0].userId
                    userP.pin = user[0].pin

                    const result = await getConnection().getRepository(tbUserProfile).save(userP)
                    // const result = await getConnection().getRepository(tbUserProfile).update(userProfileDto.userId,userP)
                    console.log(result)
                    return res.status(HttpStatus.OK).json({ message: "Edit profile Success" })


                }
                else {
                    return res.status(HttpStatus.OK).json({ message: "Phone number is used" })
                }


            }
            else {
                return res.status(HttpStatus.OK).json({ message: "Name is used" })

            }
        }
        else {
            return res.status(HttpStatus.OK).json({ message: "StaffID is used" })
        }


    }


    // **************** Delete *********************


    async delUser(userId: number, res: any) {

        const userp = await getConnection().getRepository(tbUserProfile).find({ where: { userId: userId } })

        const result1 = await getConnection().getRepository(tbUserProfile).delete(userp[0].profileId)
        const result2 = await getConnection().getRepository(tbUser).delete(userId)

        // console.log(result[0].password)
        // console.log(result1,result2)
        return res.status(HttpStatus.OK).json({ message: "Delete Success" })



    }




}