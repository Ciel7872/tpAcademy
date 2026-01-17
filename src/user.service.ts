//Activity 5. Add a comment to a user.service.ts file 



//------
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // post - save a user --- insert into
  create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  // get --select
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //GET ONE 
  async findOne(id: number): Promise<User> {//Promise<User|null>
  const user = await this.usersRepository.findOneBy({ id });
  if (!user) {
    throw new NotFoundException('Usuario: ID ${id} no encontrado');// Error 404
  }
  return user;
  }
 
  //UPDATE M
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);//run the update
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser) {
    throw new NotFoundException('Usuario con ID ${id} no encontrado.');
  }return updatedUser
  }

  //DELETE B
  async remove(id: number): Promise<void> {
    const res = await this.usersRepository.delete(id);
    if (res.affected ===0){
      throw new NotFoundException('Usuario no encontrado con ID ${id}. ')
    }

  }

//external manual loading---------------
  async loadUsersFromFile(file: Express.Multer.File) {
    const fileContent = file.buffer.toString('utf-8'); //buffer to text
    let usersToInsert: Partial<User>[]=[]

    if (file.mimetype === 'application/json' || file.originalname.endsWith('.json')) {//Detect the file type
      usersToInsert = JSON.parse(fileContent);      //  JSON
      
    } else if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      // CSV   nombre,email,password 
      const lines = fileContent.split('\n'); 
      const dataLines = lines.slice(1); //head

      usersToInsert = dataLines
        .filter(line => line.trim() !== '') 
        .map(line => {
          const [firstName, lastName, email] = line.split(',');
          return {//mapear to objet user
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
          
          };
        });
    } else {
      throw new BadRequestException('Formato no soportado. Use JSON o CSV');
    }

    const result = await this.usersRepository.save(usersToInsert);
    return {
      message: 'Usuarios cargados exitosamente',
      count: result.length,
    };

  }

  //interior load---------------

  async onModuleInit() {
    // init app
    await this.insertUsersFromSeed();
  }
  async insertUsersFromSeed() {
    try {
      //It only works if the db is empty. enable dropSchema: true (located in appmodule)
      const count = await this.usersRepository.count();
      if (count > 0) {
        console.log('La base de datos ya tiene usuarios. Saltando carga inicial (Seed).');
        return;
      }
      const filePath = path.join(process.cwd(), 'users.json');
      
      if (!fs.existsSync(filePath)) {
        console.log('No se encontró el archivo usuarios.json para la carga inicial.');
        return;
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const users: Partial<User>[] = JSON.parse(fileContent);

      await this.usersRepository.save(users);
      console.log(`Carga exitosa de datos: ${users.length} usuarios insertados automáticamente.`);

    } catch (error) {
      console.error('Error en el Seed:', error.message);
    }
  }


}