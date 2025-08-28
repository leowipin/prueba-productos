import { IsString, IsOptional, IsNumber, IsUrl, MaxLength, Min, Max } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(99999999.99)
    price?: number;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    @IsUrl({require_tld: false})
    imageUrl?: string;
}