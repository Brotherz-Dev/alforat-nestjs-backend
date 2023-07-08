import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Product } from "./product.entity";


@Injectable()
export class ProductService   {



  constructor(  @InjectRepository(Product)
  private readonly productRepo: Repository<Product> , @Inject(ConfigService) private readonly config : ConfigService) { }


  async findOne(data: number | any): Promise<Product | undefined> {
    return await this.productRepo.findOne(data);
  }

  async update(data: Product): Promise<Product | undefined> {
    return await this.productRepo.save(data);
  }


  
}