import { Type } from "class-transformer";
import { ResponseProductTypeDTO } from "src/product-type/dto/response-product-type.dto";

export class ResponseProductDTO {



    id: number;

    barCode: string;

    name: string;

    @Type(() => ResponseProductTypeDTO)
    productType: ResponseProductTypeDTO;

    @Type(() => Number)
    buyingPrice: number;

    @Type(() => Number)
    sellingPrice: number;


    @Type(() => Number)
    quantity: number;

    description: string;

    createdBy: string;

    lastUpdatedBy: string;



}