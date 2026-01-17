import { Controller, Get, Post, Body, ParseIntPipe, Param, Put, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

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

 
  @Put(':id') // PUT   /users/1
  update(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

 
  @Delete(':id') // DELETE /users/1
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Post('upload')//  users/upload
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el form-data
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }
  return this.userService.loadUsersFromFile(file);
}
}