import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()    
    @Type( () => Number )// Transformar hace la conversion enableImplicitConversion:true
    limit?: number;
    
    @IsOptional()
    @Min(0)
    @Type( () => Number )
    offset?: number;

}