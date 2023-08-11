import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from './user-guards/roles.guard';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService , RolesGuard],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }