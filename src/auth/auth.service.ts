import { Injectable,UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
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
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  async login(loginUserDto:LoginUserDto) {
    
    const user = await this.PrismaService.user.findUnique({
      where: {
        email: loginUserDto.email,
      }
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = bcrypt.compareSync(loginUserDto.password,user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    
    return user;
  }
}
