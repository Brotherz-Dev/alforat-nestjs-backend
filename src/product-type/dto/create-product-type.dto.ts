import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsOptional} from "class-validator";

export class CreateProductTypeDTO {

    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Trim()
    readonly name: string;

    @IsOptional()
    readonly description: string;
}