import { Controller, Post, Body, Get, UseGuards, SerializeOptions, UseInterceptors, ClassSerializerInterceptor, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected, GetUser, Auth } from './decorators';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @UseInterceptors(ClassSerializerInterceptor)
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  testingPrivateRoute(@GetUser() user: User) {
    return user;
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  testingPrivateRoute2(@GetUser() user: User) {
    return user;
  }

  @Get('private3')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UseInterceptors(ClassSerializerInterceptor)
  testingPrivateRoute3(@GetUser() user: User) {
    return user;
  }
}
