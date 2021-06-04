import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';


@Module({
  imports: [
    //ConfigModule.forRoot({ "envFilePath": '._develop.env' }),
    // TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: `localhost`,
      port: 3306,
      username: `root`,

      password: `heart650`,
      database: `intern_db`,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,

  ]
})

export class AppModule { }