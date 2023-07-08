import { Exclude } from "class-transformer";
import { ProductType } from "src/product-type/product-type.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinTable, OneToOne } from "typeorm";

@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        unique: true, nullable: false
    })
    public barCode: string;

    @Column({
        nullable:false
    })
    public name: string;

    @OneToOne(() => ProductType, (productType) => productType.id)
    @JoinTable()
    public productTypes: ProductType;

    @Column({
        nullable:false,
        default:0
    })
    public buyingPrice: number;

    @Column({
        nullable:false,
        default:0
    })
    public sellingPrice: number;

    @Column({
        nullable:true,
        default:0
    })
    public quantity: number;

    @Column({
        nullable: true,
        default:null
    })
    public description: string;

    @Column({
        default : null
    })
    public createdBy: string;
    
    @Column({
        default : null
    })
    public lastUpdatedBy: string;


    @Exclude()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;


}