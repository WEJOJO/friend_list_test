import { Friends } from "src/friends/friends.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Users extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name : string;

    @Column()
    status : number;

    @Column()
    password : string;

    // @Column()
    // socketid : string; //

    @OneToMany(type=>Friends, friends1=>friends1.user1, {eager:true})
    friends1 : Friends

    @OneToMany(type=>Friends, friends2=>friends2.user2, {eager:true})
    friends2 : Friends
}