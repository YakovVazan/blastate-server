import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async register(@Body() user: CreateUserDto) {
    if (
      (await this.allUsers())
        .map((user) => user.username)
        .includes(user.username)
    )
      return { error: 'User already exists' };

    return this.usersService.create(user);
  }

  @Get()
  async allUsers() {
    return this.usersService.findAll();
  }
}
