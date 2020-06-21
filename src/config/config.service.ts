import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = {
      PORT: process.env.PORT,
    };
  }

  get(key: string): string {
    return process.env[key];
  }
}
