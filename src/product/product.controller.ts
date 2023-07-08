import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Inject, HttpCode, HttpStatus, Get, Req, Body, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";




@Controller('product')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {


}