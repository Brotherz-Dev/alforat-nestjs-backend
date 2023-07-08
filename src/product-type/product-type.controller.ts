import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Body, Inject, Post, Req, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateProductTypeDTO } from "./dto/create-product-type.dto";
import { ResponseProductTypeDTO } from "./dto/response-product-type.dto";
import { UpdateProductTypeDTO } from "./dto/update-product-type.dto";
import { ProductTypeService } from "./product-type.service";




@Controller('producttype')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductTypeController {

    @Inject(ProductTypeService)
    private readonly productTypeService: ProductTypeService;


    @Post('add')
    async addProduct(@Req() req, @Body() newProductType: CreateProductTypeDTO): Promise<ResponseProductTypeDTO | undefined> {
      return this.productTypeService.createProductType(req.user.userId, newProductType);
    }

    @Patch('update')
    async updateProduct(@Req() req, @Body() newProductType: UpdateProductTypeDTO): Promise<ResponseProductTypeDTO | undefined> {
      return this.productTypeService.updateProductType(req.user.userId, newProductType);
    }


}