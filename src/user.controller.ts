import { Controller, Get, Post, Body, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
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
  
  @Get(':id') // GET /users/1
  findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe valida que sea un número
    return this.userService.findOne(id);
  }

 
  @Put(':id') // PUT /users/1
  update(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

 
  @Delete(':id') // DELETE /users/1
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}