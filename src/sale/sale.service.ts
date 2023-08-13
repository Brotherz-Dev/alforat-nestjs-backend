import { Injectable, Inject, UnauthorizedException, ConflictException, NotFoundException, InternalServerErrorException, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { JSReportService } from "src/jsreport/jsreport.service";
import { Product } from "src/product/product.entity";
import { ProductService } from "src/product/product.service";
import { SaleState } from "src/sale-state/sale-state.entity";
import { SaleStateService } from "src/sale-state/sale-state.service";
import { UserService } from "src/user/user.service";
import { In, Repository } from "typeorm";
import { CreateSaleDTO } from "./dto/create-sale.dto";
import { Sale } from "./sale.entity";


@Injectable()
export class SaleService {

  constructor(@InjectRepository(Sale)
  private readonly saleRepo: Repository<Sale>, @Inject(UserService) private readonly userService: UserService, @Inject(ProductService) private readonly productService: ProductService,
    @Inject(SaleStateService) private readonly saleStateService: SaleStateService , @Inject(JSReportService) private readonly jsReport : JSReportService) {
      
     }


  async findOne(data: number | any): Promise<Sale | undefined> {
    return await this.saleRepo.findOne(data);
  }

  async update(data: Sale): Promise<Sale | undefined> {
    return await this.saleRepo.save(data);
  }

  async create(userId: number, obj: CreateSaleDTO): Promise<Sale | undefined> {
    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const sale = new Sale();
    var saleStatesArray = [] as SaleState[];
    sale.createdBy = user.username;
    sale.customerCity = obj.customerCity;
    sale.customerId = obj.customerId;
    sale.customerName = obj.customerName;
    sale.customerPhoneNumber = obj.customerPhoneNumber;
    const newSale = await this.saleRepo.save(sale);
    if(!newSale){
      throw new InternalServerErrorException();
    }
    obj.saleStates.forEach(async (saleState) => {
      await this.saleStateService.create(saleState, newSale).then((res) => {
        if (res) {
          saleStatesArray.push(res);
        }
      });
    });
    newSale.saleStates = saleStatesArray;
    return newSale;
  }
  async getSaleById(userId: any, id: any): Promise <Sale | undefined> {
    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const sale = await this.saleRepo.findOne({
      relations:{
        saleStates : true
      },
      where: {
        id : id
      },
    });
    if(!sale){
      throw new NotFoundException('Sale Not Found!');
    }
    return sale;
  }


  






}