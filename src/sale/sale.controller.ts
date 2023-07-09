import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Inject, Req, Body, Post } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateSaleDTO } from "./dto/create-sale.dto";
import { Sale } from "./sale.entity";
import { SaleService } from "./sale.service";





@Controller('sale')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class SaleController {

    @Inject(SaleService)
    private readonly saleService: SaleService;


    @Post('add')
    async addSale(@Req() req, @Body() newSale: CreateSaleDTO): Promise<Sale | undefined> {
      return this.saleService.create(req.user.userId, newSale);
    }
}