import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({

      imports: [],
      
      inject: [],

      useFactory: async () => ({
        secret: 'ASDASD',
        signOptions: { expiresIn: '60s' },
      }),

    }),
  ],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
