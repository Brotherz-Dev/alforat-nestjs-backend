import { Controller, Post, UseGuards, Get, Body, Query, HttpStatus, HttpCode, Patch, ClassSerializerInterceptor, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Req, Res } from '@nestjs/common';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthLogin } from './dto/login.dto';
import { ForgotPasswordUserDto } from 'src/user/dto/forgot-password.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() user: CreateUserDTO): Promise<ResponseUserDto | undefined> {
        return this.authService.register(user);
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() authLogin: AuthLogin, @Req() req): Promise<ResponseLoginDto | undefined> {
        // we can save it as http only cookie for more secure
        const token = await this.authService.login(req.user);
        return token;
    }

    @Post('resetpassword')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() user: ForgotPasswordUserDto): Promise<Boolean | undefined> {
        return this.authService.resetPassword(user);
    }
}