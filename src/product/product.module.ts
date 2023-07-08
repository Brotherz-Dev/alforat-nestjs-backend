import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/product-type.entity';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductType])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule]
})
export class ProductModule { }