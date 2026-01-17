import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

/*
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
*/
@Module({
  imports: [
    // TypeOrmModule.forRoot() connetcion GLOBAL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //PC local.
      port: 5432,
      username: 'adminClau',      
      password: 'adminClau', 
      database: 'tp_academy_db', 
      
      // AUTO-LOAD ENTITIES:entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User],

      synchronize: true, 
    }),

    TypeOrmModule.forFeature([User]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}