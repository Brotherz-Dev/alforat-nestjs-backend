import { IsNotEmpty, MaxLength, MinLength } from "class-validator";



export class UpdateUserPasswordDto {

    @IsNotEmpty({ "message": "oldPassword field cannot be empty" })
    @MinLength(8)
    @MaxLength(40)
    readonly oldPassword: string;


    @IsNotEmpty({ "message": "newPassword field cannot be empty" })
    @MinLength(8)
    @MaxLength(40)
    readonly newPassword: string;


    @IsNotEmpty({ "message": "confirm password field cannot be empty" })
    @MinLength(8)
    @MaxLength(40)
    readonly confirmPassword: string;
    
}