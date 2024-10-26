import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const zodValidationMiddleware = (schema: ZodSchema): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }

    next();
  };
};

export default zodValidationMiddleware;
