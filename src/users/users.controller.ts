import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}

    @Post('/login')
    // @UseGuards(AuthGuard())
    logIn(@Body(ValidationPipe) authDto : AuthDto) : Promise<{accessToken:string}>
    {
        return this.usersService.logIn(authDto);
    }

    @Post('/enter')
    enter(@Body(ValidationPipe) authDto : AuthDto)
    {
        return this.usersService.enter(authDto);
    }
}
