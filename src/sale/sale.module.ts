import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JSReportService } from 'src/jsreport/jsreport.service';
import { ProductType } from 'src/product-type/product-type.entity';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { SaleState } from 'src/sale-state/sale-state.entity';
import { SaleStateService } from 'src/sale-state/sale-state.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SaleController } from './sale.controller';
import { Sale } from './sale.entity';
import { SaleService } from './sale.service';



@Module({
  imports: [TypeOrmModule.forFeature([Sale,SaleState , User,Product,ProductType])],
  providers: [UserService , SaleService , SaleStateService  , JSReportService, ProductService,ProductTypeService],
  controllers: [SaleController],
  exports: [TypeOrmModule]
})
export class SaleModule { }