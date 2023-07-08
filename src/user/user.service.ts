import { Injectable, Inject, NotFoundException, BadRequestException, UnauthorizedException, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import assert from "node:assert";
import { EmailAlreadyFoundException, PasswordDoesNotMatchException, PasswordWrongException, UsernameAlreadyFoundException } from "src/exception/user-exception";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserPasswordDto } from "./dto/update-password.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ConvertDTO } from "./dto/user-to-response-dto";
import { UserRole } from "./role.enum";
import { User } from "./user.entity";


@Injectable()
export class UserService  implements OnModuleInit{



  constructor(  @InjectRepository(User)
  private readonly userRepo: Repository<User> , @Inject(ConfigService) private readonly config : ConfigService) { }
  async onModuleInit() {
    const email = this.config.get<string>('ADMIN_EMAIL');
    const username = this.config.get<string>('ADMIN_USERNAME');
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if(!email || !username || !password){
      return;
    }
    const foundAdmin = await this.findOne({
      where :{
        email : email
      }
    });
    if(foundAdmin){
      console.log('Already found an admin');
      return;
    }
    const admin = new User();
    admin.email = email;
    admin.username = username;
    admin.password = password;
    admin.firstName = 'admin';
    admin.lastName = 'admin';
    admin.isEnabled = true;
    admin.isVerified = true;
    admin.roles = [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.USER];
    const createdAdmin = await this.userRepo.save(admin);
    if(createdAdmin){
      console.log('Created admin first time');
      return;
    }else{
      console.log('could not create new Admin');
    }

  }

  // find User by his username
  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { username: username } });
  }
  // find User using query and data <Data contains more than if statments>
  async findOne(data: number | any): Promise<User | undefined> {
    return await this.userRepo.findOne(data);
  }
  async update(data: User): Promise<User | undefined> {
    return await this.userRepo.save(data);
  }

  async create(body: CreateUserDTO): Promise<User | undefined> {

    const findUserWithEmail = await this.findOne({ where: { email: body.email.toLowerCase().trim() } });

    if (findUserWithEmail) {
      // User with this email already exists in Database!
      throw new EmailAlreadyFoundException(body.email);
    }

    const findUserByUsername = await this.findOne({ where: { username: body.username.toLowerCase().trim() }});

    if (findUserByUsername) {
      // User with this username already exists in Database!
      throw new UsernameAlreadyFoundException('Username: ' + body.username + 'already exists!');
    }

    const user = new User();
    user.email = body.email.toLowerCase().trim();
    user.username = body.username.toLowerCase().trim();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.phoneNumber = body.phoneNumber;
    user.telegramId = body.telegramId;
    user.password = body.password;
    user.isVerified = false;
    user.roles = [UserRole.USER];
    const createdUser = await this.userRepo.save(user);
    if(!createdUser){
      throw new InternalServerErrorException('Error code : 0x03');
    }
    return createdUser;
  }

  async getProfile(userId: any): Promise<any | undefined> {
    const user = await this.findOne({
      where: { id: userId }
    });
    if (!user)
      throw new UnauthorizedException();

    return ConvertDTO.convertUserToResponseDto(user);
  }

  async updateProfile(userId: any, newProfile: UpdateUserDto): Promise<any | undefined> {
    const user = await this.findOne({
      where: { id: userId }
    });
    if (!user)
      throw new UnauthorizedException();
    user.firstName = newProfile.firstName;
    user.lastName = newProfile.lastName;
    user.phoneNumber = newProfile.phoneNumber;
    user.telegramId = newProfile.telegramId;
    const newUser = await this.update(user);
    if (!newUser) {
      throw new InternalServerErrorException('Error 0x4');
    }
    return ConvertDTO.convertUserToResponseDto(newUser);
  }


  async updatePassword(userId: any, newPasswordObj: UpdateUserPasswordDto): Promise<Boolean | undefined> {
    if (newPasswordObj.confirmPassword !== newPasswordObj.newPassword) {
      throw new PasswordDoesNotMatchException();
    }

    const user = await this.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordCorrect = await user.checkPassword(newPasswordObj.oldPassword);
    if (user && passwordCorrect) {

      await user.hashNewPassword(newPasswordObj.newPassword);
      const updatedUser = await this.update(user);
      if (!updatedUser) {
        throw new InternalServerErrorException('Error 0x5');
      }
      return true;
    }
    throw new PasswordWrongException();
  }


  
}