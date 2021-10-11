import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmailWithPassword(email);

    if (user) {
      throw new BadRequestException('email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.createUser(email, hashedPassword);
  }
}
