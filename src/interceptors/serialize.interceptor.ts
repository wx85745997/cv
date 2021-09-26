import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassContructor {
  new (...args: any[]): unknown;
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled
    // by the request hanlder
    console.log('im running before handler', context);
    return handler.handle().pipe(
      map((data: ClassContructor) => {
        //run something before the respone is sent out
        console.log('run something before the respone is sent out', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
