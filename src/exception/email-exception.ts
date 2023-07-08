import { BadRequestException, HttpException } from "@nestjs/common";

export class EmailErrorException extends HttpException {
  constructor() {
    super(`Could not sent the Email , please try again!` , 433);
  }
}
  