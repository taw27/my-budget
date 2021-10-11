import { Expose } from 'class-transformer';

export class ResponseUser {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
