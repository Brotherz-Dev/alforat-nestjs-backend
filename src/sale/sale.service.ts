import { Injectable, Inject, UnauthorizedException, ConflictException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { SaleState } from "src/sale-state/sale-state.entity";
import { SaleStateService } from "src/sale-state/sale-state.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateSaleDTO } from "./dto/create-sale.dto";
import { Sale } from "./sale.entity";


@Injectable()
export class SaleService {

  constructor(@InjectRepository(Sale)
  private readonly saleRepo: Repository<Sale>, @Inject(UserService) private readonly userService: UserService,
    @Inject(SaleStateService) private readonly saleStateService: SaleStateService) { }


  async findOne(data: number | any): Promise<Sale | undefined> {
    return await this.saleRepo.findOne(data);
  }

  async update(data: Sale): Promise<Sale | undefined> {
    return await this.saleRepo.save(data);
  }

  async create(userId: number, obj: CreateSaleDTO): Promise<Sale | undefined> {
    const user = await this.userService.findOne({
      wheere: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const sale = new Sale();
    const saleStatesArray = [] as unknown as SaleState[];
    sale.createdBy = user.username;
    sale.customerCity = obj.customerCity;
    sale.customerId = obj.customerId;
    sale.customerName = obj.customerName;
    sale.customerPhoneNumber = obj.customerPhoneNumber;
    obj.saleStates.forEach(async (saleState) => {
      const st = await this.saleStateService.create(saleState);
      if (st) {
        saleStatesArray.push(st);
      }
    });
    sale.saleStates = saleStatesArray;
    return await this.saleRepo.save(sale);

  }






}