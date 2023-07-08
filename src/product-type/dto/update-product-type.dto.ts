import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateProductTypeDTO {

    @IsNumber()
    @IsNotEmpty()
    readonly id : number

    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Trim()
    readonly name: string;

    @IsOptional()
    readonly description: string;
}