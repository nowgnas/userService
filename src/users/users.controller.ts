// > 컨트롤러는 비즈니스 로직을 직접 수행하지 않습니다
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerfifyEmailDto } from './dto/verify-email.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // > 비즈니스 로직은 UserService에서 수행한다
  // constructor(private readonly userService: UserService) {}
  // > userService를 controller에 주입
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  //   >이메일 인증시 URL에 포함되어 전달되는 쿼리 파라미터를 @Query 데코레이터와 함께 선언한 DTO로 받습니다.
  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerfifyEmailDto): Promise<void> {
    const { signupVerifyToken } = dto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<void> {
    const { email, password } = dto;
    return await this.userService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<void> {
    return await this.userService.getUserId(userId);
  }
}
