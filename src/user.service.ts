//Activity 5. Add a comment to a user.service.ts file 



//------
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

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
  async findOne(id: number): Promise<User> {
  const user = await this.usersRepository.findOneBy({ id });
  if (!user) {
    throw new NotFoundException("Usuario: ID ${id} no encontrado");// Error 404
  }
  return user;
  }
  //findOne(id: number): Promise<User> {//Promise<User|null>
    //return this.usersRepository.findOneBy({ id });
  //}

  //UPDATE M
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);//run the update
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser) {
    throw new NotFoundException("Usuario con ID ${id} no encontrado.");
  }return updatedUser
  }

  //DELETE B
  async remove(id: number): Promise<void> {
    const res = await this.usersRepository.delete(id);
    if (res.affected ===0){
      throw new NotFoundException("Usuario no encontrado con ID ${id}. ")
    }

  }

}