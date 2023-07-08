import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, MaxLength, MinLength} from "class-validator";

export class CreateUserDTO {

    @IsNotEmpty({ "message": "Email field cannot be empty" })
    @IsEmail()
    @Trim()
    readonly email: string;

    @IsNotEmpty({ "message": "username field cannot be empty" })
    readonly username: string;

    @IsNotEmpty({ "message": "password field cannot be empty" })
    @MinLength(8)
    @MaxLength(40)
    readonly password: string;

    @IsNotEmpty({ "message": "first name field cannot be empty" })
    readonly firstName: string;

    @IsNotEmpty({ "message": "last name field cannot be empty" })
    readonly lastName: string;


    @IsOptional()
    readonly phoneNumber: string;

    @IsOptional()
    @IsNumberString()
    readonly telegramId: string;


}