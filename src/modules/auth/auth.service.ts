import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInRqDto } from './dto/signInRqDto';
import { SignInRsDto } from './dto/signInRsDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
  ) {}
  async signIn(signInRq: SignInRqDto) {
    const { uuid } = signInRq;

    let user: User = await this._userRepository.findOne({
      where: { uuid },
    });

    if (!user) {
      //Create New User
      const newUser: User = new User();
      newUser.uuid = uuid;

      await newUser.save();
      user = newUser;
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      uuid: user.uuid,
    };

    const response: SignInRsDto = new SignInRsDto();
    response.token = await this._jwtService.sign(payload);

    return response;
  }
}
