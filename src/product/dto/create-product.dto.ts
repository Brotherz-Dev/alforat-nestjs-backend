import { Trim } from "class-sanitizer";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsOptional } from "class-validator";
import { ResponseProductTypeDTO } from "src/product-type/dto/response-product-type.dto";


export class CreateProductDTO {

    @IsNotEmpty({ "message": "BarCode field cannot be empty" })
    @Trim()
    readonly barCode: string;

    
    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Trim()
    readonly name: string;

    @IsNotEmpty()
    @Type(() => ResponseProductTypeDTO)
    readonly productType : ResponseProductTypeDTO;

    @Type(() => Number) 
    @IsNotEmpty({ "message": "Buying Price field cannot be empty" })
    readonly buyingPrice : number;

    @Type(() => Number) 
    @IsNotEmpty({ "message": "Selling Price field cannot be empty" })
    readonly sellingPrice : number;

    @IsOptional()
    @Type(() => Number) 
    readonly quantity : number;

    @IsOptional()
    readonly description: string;
}