import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    
    const password = bcrypt.hashSync(createUserDto.password, 10);

    try {
      const user = await this.PrismaService.user.create({
        data: {
          ...createUserDto,
          password,
        },
        select: {
          id: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      return 'error';
    }
  }
}
