import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ResponseUser } from './dtos/response-user.dto';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { User } from 'src/user/user.entity';
import { ResponseJwt } from './dtos/response-jwt.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Serialize(ResponseUser)
  async signUp(@Body() { email, password }: SignUpDto) {
    const user = await this.authService.signUp(email, password);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @Serialize(ResponseJwt)
  async signIn(@Request() req: Request & { user: User }) {
    const { user } = req;

    return await this.authService.signJwt(user);
  }
}
