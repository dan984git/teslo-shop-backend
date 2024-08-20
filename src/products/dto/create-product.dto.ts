import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray, IsIn, IsInt, IsNumber, IsOptional,
    IsPositive, IsString, MinLength
} from "class-validator";

export class CreateProductDto {

    @ApiProperty({ example: 'Camiseta de hombres 1', description: 'Product title', nullable: false, minLength: 1 })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        example: [
            "XL",
            "L",
            "M",
            "S",
            "XS"
        ], description: 'Product sizes', nullable: false, required: true
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        example: 'men', description: 'Product gender', nullable: false, required: true
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({
        example: 10, description: 'Product price', nullable: true, required: false
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: 'Camisetas para hombres', description: 'Product description', nullable: true, required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 'camiseta_de_hombres_1', description: 'Product slug for SEO', nullable: true, required: false
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        example: 20, description: 'Product stock', nullable: true, required: false
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: [
            "camiseta"
        ], description: 'Product tags', nullable: true, required: false
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        example: [
            {
                "id": "c68469e4-d10c-4f1a-b983-911ff5b1fa4c",
                "url": "https://image1.jpg"
            },
            {
                "id": "ad37659a-f980-4441-ab24-0608059db30b",
                "url": "https://image2.jpg"
            }
        ], description: 'Product images', nullable: true, required: false
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images: string[];

}
