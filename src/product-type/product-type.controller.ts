import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";




@Controller('producttype')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductTypeController {


}