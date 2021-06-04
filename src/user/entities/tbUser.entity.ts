import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tbUser {
    @PrimaryGeneratedColumn()
    userId : number

    @Column()
    email: string

    @Column()
    password: string


    
}