import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsNumberString()
    readonly phoneNumber: string;

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsNumberString()
    @IsOptional()
    readonly telegramId: string;


}