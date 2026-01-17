import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

//route
@Controller('users') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() 
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get() 
  findAll() {
    return this.userService.findAll();
  }
}