import { Trim } from "class-sanitizer";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsOptional, IsArray, IsString } from "class-validator";
import { ResponseProductTypeDTO } from "src/product-type/dto/response-product-type.dto";


export class CreateProductDTO {

    @IsNotEmpty({ "message": "BarCode field cannot be empty" })
    @Trim()
    readonly barCode: string;

    @IsNotEmpty()
    readonly productType_id : number;

    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Trim()
    readonly name: string;

    
    @Type(() => Number) 
    @IsNotEmpty({ "message": "Buying Price field cannot be empty" })
    readonly buyingPrice : number;

    @Type(() => Number) 
    @IsNotEmpty({ "message": "Selling Price field cannot be empty" })
    readonly sellingPrice : number;


    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    readonly keywords: string[];

    @IsOptional()
    @Type(() => Number) 
    readonly quantity : number;

    @IsOptional()
    readonly description: string;
}