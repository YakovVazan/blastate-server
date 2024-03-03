import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'user1',
      password: 'password1',
    },

    {
      userId: 2,
      username: 'user2',
      password: 'password2',
    },
    {
      userId: 3,
      username: 'user3',
      password: 'password3',
    },
  ];

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
