import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Inject, Req, Body, Patch, Post, Query, Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateProductDTO } from "./dto/create-product.dto";
import { BarCodeQueryDto } from "./dto/query.product.dto";
import { ResponseProductDTO } from "./dto/response-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";





@Controller('product')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {

    @Inject(ProductService)
    private readonly productService: ProductService;


    @Post('add')
    async addProduct(@Req() req, @Body() newProductType: CreateProductDTO): Promise<Product | undefined> {
      return this.productService.createProduct(req.user.userId, newProductType);
    }

    @Patch('update')
    async updateProduct(@Req() req, @Body() newProductType: UpdateProductDTO): Promise<Product | undefined> {
      return this.productService.updateProduct(req.user.userId, newProductType);
    }

    @Get('all')
    async getProducts(@Req() req ): Promise<Product[] | undefined> {
      return this.productService.getProducts(req.user.userId );
    }

    @Get('search')
    async findProductByQuery(@Req() req , @Query() obj : BarCodeQueryDto): Promise<Product | undefined> {
      return this.productService.findProductByBarCode(req.user.userId , obj );
    }

}