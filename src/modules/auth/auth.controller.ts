import {
  Controller,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SignInRsDto } from './dto/signInRsDto';
import { SignInRqDto } from './dto/signInRqDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiResponse({ status: 200, type: SignInRqDto })
  @Post('/signin')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async SiginDto(@Body() signinDto: SignInRqDto): Promise<SignInRsDto> {
    return this._authService.signIn(signinDto);
  }
}
