import { NextFunction, Request, Response } from "express";

export const incomingRequestLogging = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.info(
      `REQUEST METHOD: [${request.method}] - URL: [${
        request.url
      }] - BODY: ${JSON.stringify(request.body)}`
    );
  
    response.on("finish", () => {
      console.info(
        `RESPONSE METHOD: [${request.method}] - URL: [${request.originalUrl}] - STATUS: [${response.statusCode}]`
      );
    });
  
    next();
  };