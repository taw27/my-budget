import { Expose } from 'class-transformer';

export class ResponseJwt {
  @Expose()
  accessToken: string;
}
