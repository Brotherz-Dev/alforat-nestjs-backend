import { Trim } from "class-sanitizer";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, MaxLength, MinLength} from "class-validator";
import { ResponseProductDTO } from "src/product/dto/response-product.dto";

export class CreateSaleStateDTO {


    @IsOptional()
    @Type(() => Number)
    readonly productId : number;

    @Type(() => Number)
    @IsNotEmpty()
    readonly price : number

    @Type(() => String)
    @IsOptional()
    readonly productName : string;


    @IsNotEmpty()
    @Type(() => Number)
    readonly quantity : number;
}