import { IsString, IsOptional, IsNumber, IsUrl, MaxLength, Min, Max } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MaxLength(255)
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(99999999.99)
    price!: number;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    @IsUrl({require_tld: false})
    imageUrl?: string;
}