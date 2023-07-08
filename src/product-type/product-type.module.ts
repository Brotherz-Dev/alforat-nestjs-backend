import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/product-type.entity';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';



@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  providers: [ProductTypeService],
  controllers: [ProductTypeController],
  exports: [TypeOrmModule]
})
export class ProductTypeModule { }