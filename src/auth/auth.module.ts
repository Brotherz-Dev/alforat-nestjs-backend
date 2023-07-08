import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stratgies/local.strategy';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { JwtStrategy } from './stratgies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthLogin } from './dto/login.dto';


@Module({
  imports: [
    UserModule,
    PassportModule,
    AuthLogin,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: 'ZMhoiXy64oqJA1sxxbNpQtQ1AjAphoUmluilLfU2rCM',
        signOptions: {
          expiresIn: '7d', algorithm: 'HS384',
        },
        verifyOptions: {
          algorithms: ['HS384'],
        },

      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }