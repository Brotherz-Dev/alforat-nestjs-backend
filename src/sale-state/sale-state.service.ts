import { Injectable, Inject, UnauthorizedException, ConflictException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateSaleStateDTO } from "./dto/sale-state.dto";
import { SaleState } from "./sale-state.entity";


@Injectable()
export class SaleStateService {

  constructor(@InjectRepository(SaleState)
  private readonly productTypeRepo: Repository<SaleState> , @InjectRepository(Product)
  private readonly productRepo: Repository<Product>) { }


  async findOne(data: number | any): Promise<SaleState | undefined> {
    return await this.productTypeRepo.findOne(data);
  }

  async update(data: Product): Promise<SaleState | undefined> {
    return await this.productTypeRepo.save(data);
  }

  async create(obj : CreateSaleStateDTO) : Promise <SaleState | undefined>{
    const product = await this.productRepo.findOne({
        where : {
            id : obj.product.id
        }
    });
    // if(!product){

    // }
    const saleState = new SaleState();

    return null;
    
  }






}