
import { SaleState } from "src/sale-state/sale-state.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinTable, Generated } from "typeorm";

@Entity("sales")
export class ProductType extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Generated("uuid")
    public uuid: string;

    @Column({
        nullable: true,
        default: null
    })
    public customer_name: string;

    @Column({
        nullable: true,
        default: null
    })
    public customer_phoneNumber: string;

    @Column({
        nullable: true,
        default: null
    })
    public customer_id: string;

    @Column({
        nullable: true,
        default: null
    })
    public customer_city: string;

    @Column({
        nullable: true,
        default: null
    })
    public description: string;

    @OneToMany(() => SaleState, (saleState) => saleState.id)
    @JoinTable()
    public saleStates: SaleState[];


    @Column({
        default: null
    })
    public createdBy: string;


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;


}