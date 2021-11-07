import {
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateRegisterDto } from './auth/dto/create-register.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ReqBody } from './users/decorators/req-body.decorator';
import { ReqUser } from './users/decorators/req-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@ReqUser() user) {
    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(
    @ReqBody(new ValidationPipe({ validateCustomDecorators: true }))
    createRegisterDto: CreateRegisterDto,
  ) {
    return this.authService.register(createRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@ReqUser() user) {
    return user;
  }
}
