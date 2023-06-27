import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Users } from "./users.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository : UsersRepository)
        {
            super ({
                secretOrKey : 'Secret1234',
                jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
            })
        }
    async validate(payload)
    {
        const {name} = payload;
        const user: Users = await this.userRepository.findOne({
            where :{
                name : name
            }
        })
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}