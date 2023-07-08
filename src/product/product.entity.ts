import { Exclude } from "class-transformer";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

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

    @Column({
        nullable:false
    })
    public productType: string;

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

    @Column()
    public description: string;


    @Exclude()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;




}