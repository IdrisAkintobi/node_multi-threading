import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Set message and status code
  let message = err.message;
  let statusCode = res.statusCode || 500;
  if (statusCode === 200) statusCode = 400;
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
