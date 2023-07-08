import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthLogin } from '../dto/login.dto';
import { Validator } from 'class-validator';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';




@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password"
    });

  }

  // Validate username and password by calling auth service 
  async validate(email: string, password: string): Promise<ResponseUserDto | undefined> {
    const inputValid = await this.isValid(email, password);
    if (!inputValid) {
      throw new BadRequestException('Email or password are wrong!');
    }
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email or password are wrong!');
    }
    return user;
  }

  async isValid(email: string, password: string): Promise<boolean> {
    const validator = new Validator();
    const authLogin = new AuthLogin();
    authLogin.password = password;
    authLogin.email = email;
    const errors = await validator.validate(authLogin);
    return errors.length === 0;
  }

}