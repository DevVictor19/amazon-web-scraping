export class HttpErrorException extends Error {
  constructor({ message, status }) {
    super(message);
    this.status = status;
  }
}

export class BadRequestErrorException extends HttpErrorException {
  constructor(message) {
    super({ message, status: 400 });
  }
}

export class InternalServerErrorException extends HttpErrorException {
  constructor(message) {
    super({ message, status: 500 });
  }
}
