export class ApiError extends Error {
  message: string;
  statusCode: number;
  isOperational: boolean;
  stack: string;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack: string = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    }
  }
}
