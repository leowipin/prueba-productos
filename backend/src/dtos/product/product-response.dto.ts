import { Expose } from 'class-transformer';

export class ProductResponseDto {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    description?: string;

    @Expose()
    price!: number;

    @Expose()
    imageUrl?: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;
}