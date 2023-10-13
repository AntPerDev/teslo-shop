import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray, IsIn, IsInt, IsNumber, IsOptional,
    IsPositive, IsString, MinLength
} from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Product title (unique)',
        minLength:1,
        nullable: false,
        title: 'Product title'
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
      description: 'Price of the product',
      example: 0.0,
      nullable: false,
      title: 'Price of the product'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
      description: 'Description of the product',
      example: 'Description of the product',
      nullable: false,
      title: 'Description of the product'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
      description: 'Product slug for SEO',
      example: 't_shirt_teslo',
      nullable: false ,
      title: 'slug'
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty()
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({
      type: [String],
      
    })
    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    tags: string[];

    @ApiProperty()
    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    images?: string[];

}
