import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth/auth-interceptor/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { getEnvPath } from './common/helper/env.helper';
import { ProductTypeModule } from './product-type/product-type.module';
import { ProductModule } from './product/product.module';
import { SaleStateModule } from './sale-state/sale-state.module';
import { SaleModule } from './sale/sale.module';
import { TypeOrmConfigService } from './typeorm/typeorm.service';
import { UserModule } from './user/user.module';


const envFilePath: string = getEnvPath(`${__dirname}`);


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    ThrottlerModule.forRoot({ ttl: 120, limit: 5 }),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService } ),
    UserModule,
    AuthModule,
    ProductTypeModule,
    SaleStateModule,
    ProductModule,
    SaleModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: AuthInterceptor }, {provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }