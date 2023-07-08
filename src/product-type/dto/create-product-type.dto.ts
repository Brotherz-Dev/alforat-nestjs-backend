import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, MaxLength, MinLength} from "class-validator";

export class CreateProductTypeDTO {

    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Trim()
    readonly name: string;

    @IsOptional()
    readonly description: string;
}