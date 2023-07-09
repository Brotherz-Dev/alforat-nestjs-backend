import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/product-type.entity';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductType , User])],
  providers: [ProductService , UserService , ProductTypeService],
  controllers: [ProductController],
  exports: [TypeOrmModule]
})
export class ProductModule { }