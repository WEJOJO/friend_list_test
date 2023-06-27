import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository : UsersRepository,
        private jwtService : JwtService
    ) {}

    async logIn(authDto : AuthDto) : Promise<{accessToken : string}>
    {
        // const {name, password, status} = authDto;
        const {name, password} = authDto;

        const user = await this.usersRepository.findOne({
            where: {
                name: name,
            }
        })
        console.log(user);
        if (user && (await bcrypt.compare(password,user.password)))
        {
            user.status = 1;
            const payload = {name};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        }
        else
        {
            console.log(user.password);
            throw new UnauthorizedException('login failed');
        }
    }
    async enter(authDto : AuthDto)
    {
        return this.usersRepository.createUser(authDto);
    }
}
