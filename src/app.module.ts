import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [AuthModule,ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [configuration],
  })]
  
})
export class AppModule {}
