import { Injectable, Inject, UnauthorizedException, NotFoundException, ConflictException, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductTypeService } from "src/product-type/product-type.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateProductDTO } from "./dto/create-product.dto";
import { BarCodeQueryDto } from "./dto/query.product.dto";
import { ResponseProductDTO } from "./dto/response-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { Product } from "./product.entity";


@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product)
  private readonly productRepo: Repository<Product>, @Inject(ConfigService) private readonly config: ConfigService ,
  @Inject(UserService) private readonly userService: UserService , @Inject(ProductTypeService) private readonly productTypeService: ProductTypeService) { }


  async findOne(data: number | any): Promise<Product | undefined> {
    return await this.productRepo.findOne(data);
  }

  async update(data: Product): Promise<Product | undefined> {
    return await this.productRepo.save(data);
  }

  async createProduct(userId: number, newProduct: CreateProductDTO) : Promise<ResponseProductDTO | undefined> {
    const user = await this.userService.findOne({
      where :{
        id : userId
      }
    });
    if(!user){
      throw new UnauthorizedException();
    }
    const productType = await this.productTypeService.checkIfProductTypeExist(newProduct.productType.id);
    if(!productType){
      throw new NotFoundException('ProductType was not found');
    }
    const checkIfProductWithBarCodeExists = await this.findOne({
      where:{
        barCode : newProduct.barCode
      }
    });
    if(checkIfProductWithBarCodeExists){
      throw new ConflictException('Product with Same barCode was Found');
    }
    const p = new Product();
    p.barCode = newProduct.barCode;
    p.name = newProduct.name;
    p.productType = productType;
    p.buyingPrice = newProduct.buyingPrice;
    p.sellingPrice = newProduct.sellingPrice;
    p.quantity = newProduct.quantity;
    p.description = newProduct.description;
    p.lastUpdatedBy = user.username;
    p.createdBy = user.username;

    return await this.productRepo.save(p);


  }

  async updateProduct(userId: number, newProduct: UpdateProductDTO): Promise<ResponseProductDTO | undefined> {
    const user = await this.userService.findOne({
      where :{
        id : userId
      }
    });
    if(!user){
      throw new UnauthorizedException();
    }
    const productType = await this.productTypeService.checkIfProductTypeExist(newProduct.productType.id);
    if(!productType){
      throw new NotFoundException('ProductType was not found');
    }
    const p = await this.findOne({
      where :{
        id : newProduct.id
      }
    });
    if(!p){
      throw new BadRequestException('Product was not found!');
    }
    p.barCode = newProduct.barCode;
    p.buyingPrice = newProduct.buyingPrice;
    p.sellingPrice = newProduct.sellingPrice;
    p.description = newProduct.description;
    p.lastUpdatedBy = user.username;
    p.name = newProduct.name;
    p.productType = productType;

    return await this.productRepo.save(p);
  }

  async getProducts(userId : number) : Promise<ResponseProductDTO[] | undefined> {
    const user = await this.userService.findOne({
      where :{
        id : userId
      }
    });
    if(!user){
      throw new UnauthorizedException();
    }
    return await this.productRepo.find();
  }

  async findProductByBarCode(userId : number , obj : BarCodeQueryDto) : Promise<ResponseProductDTO | undefined> {
    const user = await this.userService.findOne({
      where :{
        id : userId
      }
    });
    if(!user){
      throw new UnauthorizedException();
    }
    const product = await this.productRepo.findOne({
      where:{
        barCode : obj.barCode
      }
    });
    if(!product){
      throw new NotFoundException('Product was not found!');
    }
    return product;
  }

}