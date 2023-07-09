import { Trim } from "class-sanitizer";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, MaxLength, MinLength} from "class-validator";
import { ResponseProductDTO } from "src/product/dto/response-product.dto";

export class CreateSaleStateDTO {


    @IsNotEmpty()
    @Type(() => ResponseProductDTO)
    readonly product : ResponseProductDTO;


    @IsNotEmpty()
    @Type(() => Number)
    readonly quantity : number;
}