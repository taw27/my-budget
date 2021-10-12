import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jswtService: JwtService,
  ) {}

  async signUp(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmailWithPassword(email);

    if (user) {
      throw new BadRequestException('email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.createUser(email, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmailWithPassword(email);

    const isCorrectCredentials =
      user && (await bcrypt.compare(password, user.password)); // compares password with hashed password if user is defined

    return isCorrectCredentials ? user : null;
  }

  async signJwt({ email, id }: User) {
    const payload = { email, sub: id };

    return { accessToken: this.jswtService.sign(payload) };
  }
}
