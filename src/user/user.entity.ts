import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  @Length(4, 30)
  @IsNotEmpty()
  email: string;

  @Column('text')
  @IsNotEmpty()
  password: string;
}
