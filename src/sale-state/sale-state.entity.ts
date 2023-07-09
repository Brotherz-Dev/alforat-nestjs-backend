
import { Product } from "src/product/product.entity";
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


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;


}