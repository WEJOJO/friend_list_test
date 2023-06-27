import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { Users } from "./users.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository extends Repository<Users>
{
    constructor(private dataSource : DataSource)
    {
        super (Users, dataSource.createEntityManager());
    }
    async createUser (authDto : AuthDto)
    {
        // const {name, password,status} = authDto;
        const {name, password} = authDto;


        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = this.create({name, status:0, password:hashedPassword})
        console.log(user);
        
        try {
            await this.save(user);
        }
        catch(error)
        {
            if (error.code == 23505)
            {
                throw new ConflictException('already exist');
            }
            else
            {
                console.log(error.code);
                throw new InternalServerErrorException();
            }
        }
        return user;
    }
}