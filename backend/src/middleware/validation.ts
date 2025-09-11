import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { body, param, query } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
    return;
  }

  next();
};

// Common validation rules
export const validateObjectId = (field: string = "id") =>
  param(field).isMongoId().withMessage("Invalid ID format");

export const validateEmail = () =>
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required");

export const validatePassword = () =>
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    );

export const validateName = (field: string = "name") =>
  body(field)
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage(`${field} must be between 2 and 50 characters`);

export const validatePhone = () =>
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Valid phone number is required");

export const validatePagination = () => [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

export const validateSearch = () =>
  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search term must be between 1 and 100 characters");

// Validation middleware factory
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    validateRequest(req, res, next);
  };
};
