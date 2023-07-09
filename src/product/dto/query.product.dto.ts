import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class BarCodeQueryDto {
    
    @IsNotEmpty()
    @Type(() => String)
    readonly barCode : string;


}