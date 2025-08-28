import { Request, Response } from 'express';
import { ProductService } from "../services/product.service";
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';

export class ProductController{
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public async createProduct(req: Request, res: Response): Promise<Response> {
        const createProductDto: CreateProductDto = req.body;
        const product = await this.productService.createProduct(createProductDto);
        return res.status(201).json(product);
    }

    public async findAllProducts(_req: Request, res: Response): Promise<Response> {
        const products = await this.productService.findAllProducts();
        return res.status(200).json(products);
    }

    public async findProductById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const product = await this.productService.findProductById(id);
        return res.status(200).json(product);
    }

    public async updateProduct(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const updateProductDto: UpdateProductDto = req.body;
        const product = await this.productService.updateProduct(id, updateProductDto);
        return res.status(200).json(product);
    }

    public async deleteProduct(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await this.productService.deleteProduct(id);
        return res.sendStatus(204); 
    }

}