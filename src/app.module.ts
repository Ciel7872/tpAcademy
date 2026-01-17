import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      
      // AUTO-LOAD ENTITIES:
      // Esto busca automáticamente cualquier archivo que termine en .entity.ts
      // y lo registra como tabla. En Java tendrías que listarlas en el persistence.xml.
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      
      // SYNCHRONIZE: ¡OJO CON ESTO!
      // true = Si cambias una clase, TypeORM altera la tabla real (DROP/ALTER).
      // Es genial para desarrollo (dev), pero PROHIBIDO en producción (prod) porque borra datos.
      // Equivalente a: hibernate.hbm2ddl.auto = update
      synchronize: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}