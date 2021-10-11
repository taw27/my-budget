import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// From Stephen Griders NestJS course
interface ClassConstructor {
  new (...args: any[]): any;
}

// Decorator to wrap the SerializeInterceptor and use it
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Interceptor Class to convert outgoing response to a supplied Dto class which can be used to explicitly include or exclude certain properties
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) =>
          plainToClass(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}
