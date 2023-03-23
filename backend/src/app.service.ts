import { Injectable } from '@nestjs/common';

import { User, UserDTO } from './user.model';

const MOCK_DB: Array<UserDTO> = [
  { id: '1', username: 'bob', password: 'bob' },
  { id: '2', username: 'bill', password: 'bill' },
  { id: '3', username: 'jack', password: 'jack' },
];

@Injectable()
export class AppService {
  getUser(user: User): boolean {
    return MOCK_DB.some(
      (u: UserDTO) =>
        u.username === user.username && u.password === user.password,
    );
  }
}
