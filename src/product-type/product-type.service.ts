import { Injectable, Inject, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateProductTypeDTO } from "./dto/create-product-type.dto";
import { ProductTypeQueryDto } from "./dto/query-product.dto";
import { ResponseProductTypeDTO } from "./dto/response-product-type.dto";
import { UpdateProductTypeDTO } from "./dto/update-product-type.dto";
import { ProductType } from "./product-type.entity";


@Injectable()
export class ProductTypeService {
  constructor(@InjectRepository(ProductType)
  private readonly productTypeRepo: Repository<ProductType>, @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(UserService) private readonly userService: UserService) { }


  async findOne(data: number | any): Promise<ProductType | undefined> {
    return await this.productTypeRepo.findOne(data);
  }

  async update(data: Product): Promise<ProductType | undefined> {
    return await this.productTypeRepo.save(data);
  }

  async createProductType(userId: number, newProductType: CreateProductTypeDTO): Promise<ProductType | undefined> {
    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const productType = await this.findOne({
      where: {
        name: newProductType.name.trim()
      }
    });
    if (productType) {
      throw new ConflictException('Already Found with same name');
    }
    const p = new ProductType();
    p.name = newProductType.name;
    p.description = newProductType.description;
    p.createdBy = user.username;
    p.lastUpdatedBy = user.username;
    return await this.productTypeRepo.save(p);
  }

  async updateProductType(userId: number, newProductType: UpdateProductTypeDTO): Promise<ProductType | undefined> {
    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const d = await this.findOne({
      where: {
        name: newProductType.name
      }
    });
    if (d && newProductType.id !== d.id) {
      throw new ConflictException('Already Found Product type with same name');
    }
    const productType = await this.checkIfProductTypeExist(newProductType.id);
    if (!productType) {
      throw new NotFoundException('Product type not found');
    }

    productType.name = newProductType.name;
    productType.description = newProductType.description;
    productType.lastUpdatedBy = user.username;
    return await this.productTypeRepo.save(productType);
  }

  async checkIfProductTypeExist(id: number): Promise<ProductType | undefined> {
    if (!id) {
      return undefined;
    }
    const p = await this.findOne({
      where: {
        id: id
      }
    });
    if (!p) {
      return undefined;
    }
    return p;
  }

  async getAllProductTypes(userId: any): Promise<ProductType[] | undefined> {
    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const p = await this.productTypeRepo.find();
    return p || [];
  }

  async findProductTypeByName(userId: any, obj: ProductTypeQueryDto): Promise<ProductType | undefined> {
    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const d = await this.findOne({
      where: {
        name: obj.name
      }
    });
    if(!d){
      throw new NotFoundException();
    }
    return d;
  }

}