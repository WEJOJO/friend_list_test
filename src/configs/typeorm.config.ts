import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : '127.0.0.1',
    port : 5432,
    username : 'nhwang',
    password : 'postgres',
    database : 'friends_test',
    entities : [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : true
}