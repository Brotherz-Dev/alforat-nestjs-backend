import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class AuthLogin {

    @IsNotEmpty({message:"Email can not be empty"})
    @IsEmail()
    @IsString({message:"Email should be a string"})
    email : string;

    @IsNotEmpty({message:"password can not be empty"})
    @IsString({message:"password should be a string"})
    password : string;

}

