import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tbLeave {
    @PrimaryGeneratedColumn()
    leaveId: number

    
    @Column()
    name: string

    @Column()
    staffId: string

    @Column()
    position: string

    @Column()
    department: string

    @Column()
   location: string

    @Column()
    phone : string

    @Column()
    typeLeave: string

    @Column()
    dateLeave: string

    @Column()
    reason: string

    @Column()
    date: string

    @Column()
    status: string

    @Column()
    reasonAdmin: string

    @Column()
    dateApproved: string

    @Column()
    record: string

    @Column()
    comment: string
    
    @Column()
    pin: string

}