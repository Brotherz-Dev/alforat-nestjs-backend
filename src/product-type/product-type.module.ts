import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/product-type.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';



@Module({
  imports: [TypeOrmModule.forFeature([ProductType , User])],
  providers: [ProductTypeService , UserService],
  controllers: [ProductTypeController],
  exports: [TypeOrmModule]
})
export class ProductTypeModule { }