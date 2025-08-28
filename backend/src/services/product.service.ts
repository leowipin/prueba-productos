import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { ProductResponseDto } from '../dtos/product/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { ConflictError, NotFoundError } from '../errors/http.error';
import { UpdateProductDto } from '../dtos/product/update-product.dto';

export class ProductService {
    private productRepository: Repository<Product>;

    constructor(productRepository: Repository<Product>) {
        this.productRepository = productRepository;
    }

    public async createProduct(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        try {
            const productEntity = this.productRepository.create(createProductDto);
            const savedProduct = await this.productRepository.save(productEntity);
            return plainToInstance(ProductResponseDto, savedProduct, { excludeExtraneousValues: true });
        } catch (error: any) {
            if (error && error.code === '23505') {
                throw new ConflictError(`Ya existe un producto con el nombre '${createProductDto.name}'.`);
            }
            throw new Error(error);
        }
    }

    public async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
        try {
            const product = await this.productRepository.preload({
                id: id,
                ...updateProductDto,
            });
            if (!product) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado.`);
            }
            const savedProduct = await this.productRepository.save(product);
            return plainToInstance(ProductResponseDto, savedProduct, { 
                excludeExtraneousValues: true 
            });
        } catch (error: any) {
            if (error && error.code === '23505') {
                throw new ConflictError(`Ya existe un producto con el nombre '${updateProductDto.name}'.`);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new Error(error);
        }
    }
    
    public async findAllProducts(): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.find();
        return plainToInstance(ProductResponseDto, products, { excludeExtraneousValues: true });
    }

    public async findProductById(id: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundError(`Producto con ID '${id}' no encontrado.`);
        }
        return plainToInstance(ProductResponseDto, product, { excludeExtraneousValues: true });
    }

    public async deleteProduct(id: string): Promise<void> {
        const result = await this.productRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
        }
    }

}
