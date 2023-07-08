import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Inject, HttpCode, HttpStatus, Get, Req, Body, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { HasRoles } from "./decorator/roles.decorator";
import { ResponseUserDto } from "./dto/response-user.dto";
import { UpdateUserPasswordDto } from "./dto/update-password.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./role.enum";
import { RolesGuard } from "./user-guards/Roles.guard";
import { UserService } from "./user.service";



@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Req() req): Promise<ResponseUserDto | undefined> {
    return this.userService.getProfile(req.user.userId);
  }

  @Patch('updatepassword')
  async updatePassword(@Req() req, @Body() newPasswordObj: UpdateUserPasswordDto): Promise<Boolean | undefined> {
    return this.userService.updatePassword(req.user.userId, newPasswordObj);
  }

  @Patch('updateProfile')
  async updateProfile(@Req() req, @Body() newProfile: UpdateUserDto): Promise<Boolean | undefined> {
    return this.userService.updateProfile(req.user.userId, newProfile);
  }

  @Get('admin')
  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async admin (@Req() req) : Promise<string | undefined>{
    return req.user.userId;
  }

}