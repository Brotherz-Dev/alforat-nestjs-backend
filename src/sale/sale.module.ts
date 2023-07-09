import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/product-type.entity';
import { SaleState } from 'src/sale-state/sale-state.entity';
import { SaleStateService } from 'src/sale-state/sale-state.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SaleController } from './sale.controller';
import { Sale } from './sale.entity';
import { SaleService } from './sale.service';



@Module({
  imports: [TypeOrmModule.forFeature([Sale,SaleState , User])],
  providers: [UserService , SaleService , SaleStateService],
  controllers: [SaleController],
  exports: [TypeOrmModule]
})
export class SaleModule { }