import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friends extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(type => Users, user1=>user1.friends1, {eager : false})
    user1: Users;

    @ManyToOne(type => Users, user2=>user2.friends2, {eager : false})
    user2: Users;
}