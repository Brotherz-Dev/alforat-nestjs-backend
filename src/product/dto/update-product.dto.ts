import { Trim } from "class-sanitizer";
import { Type } from "class-transformer";
import { IsArray, isInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ResponseProductTypeDTO } from "src/product-type/dto/response-product-type.dto";

export class UpdateProductDTO {

    @IsNumber()
    @IsNotEmpty()
    readonly id : number;

    @IsNotEmpty({ "message": "BarCode field cannot be empty" })
    @Trim()
    readonly barCode: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    readonly keywords: string[];

    
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