import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ResponseUser } from './dtos/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Serialize(ResponseUser)
  async signUp(@Body() { email, password }: SignUpDto) {
    const user = await this.authService.signUp(email, password);

    return user;
  }
}
