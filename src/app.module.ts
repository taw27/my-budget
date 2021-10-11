import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DB_URL'),
        logging: config.get<boolean>('DB_LOGGING'),
        synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
