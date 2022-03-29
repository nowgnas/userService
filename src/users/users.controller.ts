import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerfifyEmailDto } from './dto/verify-email.dto';

@Controller('users')
export class UsersController {
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  //   >이메일 인증시 URL에 포함되어 전달되는 쿼리 파라미터를 @Query 데코레이터와 함께 선언한 DTO로 받습니다.
  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerfifyEmailDto): Promise<void> {
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<void> {
    console.log(dto);
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<void> {
    console.log(userId);
    return;
  }
}
