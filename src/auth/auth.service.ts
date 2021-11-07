import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne({ email: email });

    //if (user && user.password === password) {
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createRegisterDto: CreateRegisterDto) {
    const user = await this.usersService.findOne({
      email: createRegisterDto.email,
    });

    if (user && user.email === createRegisterDto.email) {
      throw new ConflictException('Choose another email');
    }

    createRegisterDto.password = await bcrypt.hash(
      createRegisterDto.password,
      12,
    );

    return await this.usersService.create(createRegisterDto);
  }
}
