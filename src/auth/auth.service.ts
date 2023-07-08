import { Injectable, Inject, UnauthorizedException, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserIsDisabledException, EmailNotFoundException } from "src/exception/user-exception";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { ForgotPasswordUserDto } from "src/user/dto/forgot-password.dto";
import { ResponseUserDto } from "src/user/dto/response-user.dto";
import { ConvertDTO } from "src/user/dto/user-to-response-dto";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { ResponseLoginDto } from "./dto/response-login.dto";


@Injectable()
export class AuthService {

  @Inject(ConfigService) private readonly config: ConfigService
  constructor(@Inject(UserService)private readonly userService: UserService,@Inject(JwtService) private readonly jwtService: JwtService) { }

  // Validates  user if exists in database with username and password , returns user if exists and password is correct!
  async validateUser(email: string, pass: string): Promise<User | undefined> {
    const user = await this.userService.findOne({
      where: { email: email }
    });
    if (!user)
    {
      throw new UnauthorizedException('Email or password are wrong!');

    }
    const passwordCorrect = await user.checkPassword(pass);
    if (user && passwordCorrect) {
      return user;
    }
    return null;

  }

  // it comes to this method after it validates the user credentials in LocalStrategy , if the user exists and everything goes well , it going to create an access_token
  // returns access_token with sub as user id and email as user's email 

  async login(user: User): Promise<ResponseLoginDto | undefined> {
    if (!user) {
      throw new UnauthorizedException('Email or password are wrong!');
    }

    if (!user.isEnabled) {
      throw new UserIsDisabledException();
    }
    user.lastLoginAt = new Date();
    const payload = { isVerified: user.isVerified, email: user.email, sub: user.id };

    const response = new ResponseLoginDto();
    if (!user.isVerified) {
      throw new UnauthorizedException('Email is not verified , please contact admin!')
    }
    await this.userService.update(user);
    const value =  {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_KEY'), expiresIn: this.config.get<string>('JWT_EXPIRES')
      })
    };
    response.access_token = value.access_token;
    return response;
  }

  // Register user 
  async register(data: CreateUserDTO): Promise<ResponseUserDto | undefined> {

    const response = await this.userService.create(data);
    if (response) {  
      return ConvertDTO.convertUserToResponseDto(response);
    }
    throw new InternalServerErrorException('Error code : 0x01');
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token)
  }

  async resetPassword(obj: ForgotPasswordUserDto): Promise<Boolean | undefined> {
    const user = await this.userService.findOne({
      where: { email: obj.email }
    });
    if(!user){
      throw new EmailNotFoundException(obj.email);
    }
    // should implement the telegram 
    return true;
  }

}