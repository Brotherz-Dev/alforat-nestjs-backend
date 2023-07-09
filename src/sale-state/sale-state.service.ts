import { Injectable, Inject, UnauthorizedException, ConflictException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { Repository } from "typeorm";
import { CreateSaleStateDTO } from "./dto/sale-state.dto";
import { SaleState } from "./sale-state.entity";


@Injectable()
export class SaleStateService {

  constructor(@InjectRepository(SaleState)
  private readonly saleStateRepo: Repository<SaleState>) { }


  async findOne(data: number | any): Promise<SaleState | undefined> {
    return await this.saleStateRepo.findOne(data);
  }

  async update(data: SaleState): Promise<SaleState | undefined> {
    return await this.saleStateRepo.save(data);
  }

  async create(obj : CreateSaleStateDTO) : Promise <SaleState | undefined>{
    const saleState = new SaleState();
    if(obj.productId){
      saleState.productId = obj.productId;
      saleState.quantity = obj.quantity;
      saleState.sellingPrice = obj.price;
      saleState.productName = obj.productName;
    }
    else{
      saleState.quantity = obj.quantity;
      saleState.sellingPrice = obj.price;
      saleState.productName = obj.productName;
    }
    return await this.saleStateRepo.save(saleState);
  }






}