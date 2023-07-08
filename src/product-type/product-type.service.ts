import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { Repository } from "typeorm";
import { ProductType } from "./product-type.entity";


@Injectable()
export class ProductTypeService   {



  constructor(  @InjectRepository(ProductType)
  private readonly productTypeRepo: Repository<ProductType> , @Inject(ConfigService) private readonly config : ConfigService) { }


  async findOne(data: number | any): Promise<ProductType | undefined> {
    return await this.productTypeRepo.findOne(data);
  }

  async update(data: Product): Promise<ProductType | undefined> {
    return await this.productTypeRepo.save(data);
  }


  
}