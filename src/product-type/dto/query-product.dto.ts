import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ProductTypeQueryDto {
    
    @IsNotEmpty()
    @Type(() => String)
    readonly name : string;


}