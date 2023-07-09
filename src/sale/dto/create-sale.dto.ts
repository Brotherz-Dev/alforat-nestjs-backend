import { Type } from "class-transformer";
import { IsOptional, IsNotEmpty, IsArray } from "class-validator";
import { CreateSaleStateDTO } from "src/sale-state/dto/sale-state.dto";

export class CreateSaleDTO {


    @IsOptional()
    @Type(() => String)
    readonly customerName : string;

    @IsOptional()
    @Type(() => String)
    readonly customerPhoneNumber : string;

    @IsOptional()
    @Type(() => String)
    readonly customerId : string;

    @IsOptional()
    @Type(() => String)
    readonly customerCity : string;

    @IsOptional()
    @Type(() => String)
    readonly description : string;

    @IsNotEmpty()
    @IsArray()
    @Type(() => CreateSaleStateDTO)
    readonly saleStates : CreateSaleStateDTO[];

}