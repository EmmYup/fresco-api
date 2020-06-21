import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { User } from '../../../modules/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { uuid } = payload;
    const user = await this._userRepository.findOne({
      where: { uuid },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
