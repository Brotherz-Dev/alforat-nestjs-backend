import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsEmail } from "class-validator";

export class ForgotPasswordUserDto{
    
    @IsNotEmpty({ "message": "Email field cannot be empty" })
    @IsEmail()
    @Trim()
    readonly email: string;

}