import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { skipAuth } from './skip-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @skipAuth()
  @Post('login')
  login(@Req() req): any {
    return this.authService.login(req.user);
  }

  @Get('protected')
  getHello(@Req() req): string {
    return req.user;
  }
}
