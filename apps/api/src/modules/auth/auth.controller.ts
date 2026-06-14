import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: { user: { sub: string } }) {
    return this.authService.getMe(req.user.sub);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  updateMe(@Req() req: { user: { sub: string } }, @Body() dto: UpdateProfileDto) {
    return this.authService.updateMe(req.user.sub, dto);
  }
}
