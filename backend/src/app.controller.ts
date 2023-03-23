import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { User } from './user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body() data: User): { status: boolean } {
    const user = this.appService.getUser(data);
    if (user) {
      return { status: true };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Wrong username or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
