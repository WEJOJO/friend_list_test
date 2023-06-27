import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret:'Secret1234',
      signOptions:{
        expiresIn:3600,
      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class UsersModule {}
