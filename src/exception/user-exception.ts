import { ConflictException, HttpException, NotAcceptableException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export class EmailNotFoundException extends NotFoundException {
    constructor(private email: string) {
      super(`${email} was not found`);
    }
}

export class UsernameNotFoundException extends NotFoundException {
  constructor(private username: string) {
    super(`${username} was not found`);
  }
}

// Email register exceptions
export class UsernameAlreadyFoundException extends HttpException {
  constructor(private username: string) {
    super(`The username ${username} is already exists` , 430);
  }
}

export class EmailAlreadyFoundException extends ConflictException {
  constructor(private email: string) {
    super(`The email ${email} already exists!`);
  }
}

export class ReferedByNotFoundException extends NotFoundException {
  constructor(private username: string) {
    super(`The refered by username ${username} that you used does not exists!`);
  }
}
//


export class UserIsAlreadyVerifiedException extends NotAcceptableException {
  constructor(private email: string) {
    super(`The ${email} is already been verified!`);
  }
}

export class UserIsNotVerifiedException extends NotAcceptableException {
  constructor() {
    super(`This account is not verified , please check your email address for the verification link`);
  }
}

export class UserIsDisabledException extends UnauthorizedException {
  constructor() {
    super(`The User has been disabled , Please contact support for more informations`);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(`User not Found`);
  }
}


export class PasswordDoesNotMatchException extends NotAcceptableException {
  constructor() {
    super(`Password Does not match! please try again!`);
  }
}

export class PasswordWrongException extends ConflictException {
  constructor() {
    super(`Password is wrong , please try again`);
  }
}

