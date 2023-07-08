import { Type } from "class-transformer";

export class ResponseUserDto {

    id : number

    email: string;
    
    username: string;

    firstName: string;

    lastName: string;

    isVerified: boolean;
  
    isEnabled: boolean;

    phoneNumber: string;

    telegramId: string;

    @Type(() => Date)
    lastLoginAt: Date | null;

    @Type(() => Date)
    updated_at: Date;

}