
import { Exclude } from "class-transformer";
import { Product } from "src/product/product.entity";
import { Sale } from "src/sale/sale.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinTable, OneToOne, ManyToOne } from "typeorm";

@Entity("sale_states")
export class SaleState extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;


    @Column({
        nullable: true,
        default: null
    })
    public productId: number;

    @Column({
        nullable: true,
        default: null
    })
    public productBarCode: string;

    @Column({
        default: 1
    })
    public quantity: number;

    @Column({
        nullable: false
    })
    public sellingPrice: number;

    @Column({
        nullable: true,
        default: null
    })
    public productName: string;

    @ManyToOne(() => Sale, (s) => s.saleStates)
    public sale: Sale;

    @Exclude()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @Exclude()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;


}