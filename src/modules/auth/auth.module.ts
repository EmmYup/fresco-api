import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '../../config/config.service';
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.keys';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

const jwtM = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory(config: ConfigService) {
    return {
      secret: config.get(Configuration.JWT_SECRET),
      signOptions: {
        expiresIn: '999 year',
      },
    };
  },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    jwtM,
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, jwtM],
})
export class AuthModule {}
