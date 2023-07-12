
import { SaleState } from "src/sale-state/sale-state.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinTable, Generated, JoinColumn } from "typeorm";

@Entity("sales")
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Generated("uuid")
    public uuid: string;

    @Column({
        nullable: true,
        default: null
    })
    public customerName: string;

    @Column({
        nullable: true,
        default: null
    })
    public customerPhoneNumber: string;

    @Column({
        nullable: true,
        default: null
    })
    public customerId: string;

    @Column({
        nullable: true,
        default: null
    })
    public customerCity: string;

    @Column({
        nullable: true,
        default: null
    })
    public description: string;

    @OneToMany(() => SaleState, (saleState) => saleState.sale)
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