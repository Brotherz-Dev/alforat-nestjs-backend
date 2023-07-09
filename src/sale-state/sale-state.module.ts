import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/product-type.entity';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SaleState } from './sale-state.entity';
import { SaleStateService } from './sale-state.service';



@Module({
  imports: [TypeOrmModule.forFeature([Product,SaleState , User , ProductType])],
  providers: [ProductService ,SaleStateService , UserService  , ProductTypeService],
  controllers: [],
  exports: [TypeOrmModule]
})
export class SaleStateModule { }