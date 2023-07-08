import { User } from "../user.entity";
import { ResponseUserDto } from "./response-user.dto";

export class ConvertDTO {
    public static convertUserToResponseDto(user: User): ResponseUserDto {
        const response = new ResponseUserDto();
        response.id = user.id;
        response.email = user.email;
        response.username = user.username;
        response.firstName = user.firstName;
        response.lastName = user.lastName;
        response.isVerified = user.isVerified;
        response.isEnabled = user.isEnabled;
        response.phoneNumber = user.phoneNumber;
        response.lastLoginAt = user.lastLoginAt;
        response.updated_at = user.updated_at;
        response.telegramId = user.telegramId;
        return response;

    }

}