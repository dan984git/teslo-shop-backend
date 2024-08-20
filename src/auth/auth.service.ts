import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto, LoginUserDto, ResponseLoginDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      return user;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto;

    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new UnauthorizedException(`Credentials are not valid`);

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException(`Credentials are not valid`);

    const jwt = this.getJwtToken({ id: user.id, email: user.email, username: user.username });
    return new ResponseLoginDto({ user, jwt });
  }

  checkAuthStatus(user: User) {
    const jwt = this.getJwtToken({ id: user.id, email: user.email, username: user.username });
    return new ResponseLoginDto({ user, jwt });
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      const column = error.detail.split(/[()]+/);
      if (column[1] == 'us_email') throw new BadRequestException(`Email is already taken`);
      if (column[1] == 'us_username') throw new BadRequestException(`Username is already taken`);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Check logs');
  }
}
