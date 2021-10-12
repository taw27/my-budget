import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ResponseUser } from './dtos/response-user.dto';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { User } from 'src/user/user.entity';
import { ResponseJwt } from './dtos/response-jwt.dto';
import { PublicRoute } from 'src/decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Returns a newly created user if correct new user details are sent
  @PublicRoute()
  @Post('/signup')
  @Serialize(ResponseUser)
  async signUp(@Body() { email, password }: SignUpDto) {
    const user = await this.authService.signUp(email, password);

    return user;
  }

  // Route returns an access token is request sent with correct log in credentials
  @PublicRoute() // defines route as public to bypass jwt check
  @UseGuards(LocalAuthGuard) // verifies log in credentials
  @Post('/signin')
  @Serialize(ResponseJwt)
  async signIn(@Request() req: Request & { user: User }) {
    const { user } = req;

    return await this.authService.signJwt(user);
  }
}
