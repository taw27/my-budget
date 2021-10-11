import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmailWithPassword(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  createUser(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });

    return this.userRepository.save(user);
  }
}
