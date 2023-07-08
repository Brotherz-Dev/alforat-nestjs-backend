import { Type } from "class-transformer";

export class ResponseProductTypeDTO {

    id : number

    name: string;
    
    description: string | null;

    createdBy: string | null;

    lastUpdatedBy: string | null;

    @Type(() => Date)
    created_at: Date | null;

    @Type(() => Date)
    updated_at: Date | null;

}