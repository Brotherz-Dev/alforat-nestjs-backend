
import { Exclude } from "class-transformer";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity("product-types")
export class ProductType extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        nullable:false
    })
    public name: string;

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