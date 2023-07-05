import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto ,LoginUserDto} from './dto';
import { Auth } from './decorators';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('private')
  @Auth(ValidRoles.USER,ValidRoles.ADMIN)
  private() {
    return 'private';
    //return this.authService.login(loginUserDto);
  }
  
}
