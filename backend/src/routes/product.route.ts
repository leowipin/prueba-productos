import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { ProductController } from "../controllers/product.controller";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../types/user.type";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateProductDto } from "../dtos/product/create-product.dto";
import { asyncHandler } from "../utils/async-handler";
import { UpdateProductDto } from "../dtos/product/update-product.dto";

const productRepository = AppDataSource.getRepository(Product);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();

router.get(
    '/',
    authMiddleware([UserRole.USER]),
    asyncHandler(productController.findAllProducts.bind(productController))
);

router.get(
    '/:id',
    authMiddleware([UserRole.USER]),
    asyncHandler(productController.findProductById.bind(productController))
);

router.post(
    '/',
    authMiddleware([UserRole.USER]),
    validationMiddleware(CreateProductDto),
    asyncHandler(productController.createProduct.bind(productController))
);

router.patch(
    '/:id',
    authMiddleware([UserRole.USER]),
    validationMiddleware(UpdateProductDto),
    asyncHandler(productController.updateProduct.bind(productController))
);

router.delete(
    '/:id',
    authMiddleware([UserRole.USER]),
    asyncHandler(productController.deleteProduct.bind(productController))
);

export default router;