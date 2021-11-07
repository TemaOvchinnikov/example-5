import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    //return this.authService.login();
    //return req.user;
    return this.authService.login(req.user);
  }

  //@UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }
}
