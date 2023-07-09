import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Body, Inject, Post, Req, Patch, Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateProductTypeDTO } from "./dto/create-product-type.dto";
import { ResponseProductTypeDTO } from "./dto/response-product-type.dto";
import { UpdateProductTypeDTO } from "./dto/update-product-type.dto";
import { ProductType } from "./product-type.entity";
import { ProductTypeService } from "./product-type.service";




@Controller('producttype')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductTypeController {

    @Inject(ProductTypeService)
    private readonly productTypeService: ProductTypeService;


    @Post('add')
    async addProductType(@Req() req, @Body() newProductType: CreateProductTypeDTO): Promise<ProductType | undefined> {
      return this.productTypeService.createProductType(req.user.userId, newProductType);
    }

    @Patch('update')
    async updateProductType(@Req() req, @Body() newProductType: UpdateProductTypeDTO): Promise<ProductType | undefined> {
      return this.productTypeService.updateProductType(req.user.userId, newProductType);
    }

    @Get('all')
    async getAllProductTypes(@Req() req): Promise<ProductType[] | undefined> {
      return this.productTypeService.getAllProductTypes(req.user.userId);
    }


}