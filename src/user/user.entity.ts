import { InternalServerErrorException } from '@nestjs/common';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './role.enum';


@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  public email: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  public username: string;

  @Exclude()
  @Column()
  @IsNotEmpty()
  public password: string;

  @Column()
  @IsNotEmpty()
  public firstName: string;

  @Column()
  @IsNotEmpty()
  public lastName: string;

  @Column({
    type: "set",
    enum: UserRole,
    default: [UserRole.USER]
  })
  public roles: UserRole[];



  @Column({ default: false })
  public isVerified: boolean;

  @Column({ default: true })
  public isEnabled: boolean;

  @Column({ default: null })
  public phoneNumber: string;

  @Column({ default: null })
  public telegramId: string;



  @Exclude()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;



  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      this.email = this.email.toLowerCase().trim();
      this.username = this.username.toLowerCase().trim();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async hashNewPassword(password: string): Promise<void> {
    try {
      this.password = await bcrypt.hash(password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Error code : 0x02');
    }
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(inputPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        ...error.response,
      });
    }
  }


}