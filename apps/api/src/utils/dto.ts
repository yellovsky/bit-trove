// global modules
import { ValidateIf, type ValidationOptions } from 'class-validator';

export const IsNullable =
  (options?: ValidationOptions): PropertyDecorator =>
  (prototype: Object, propertyKey: string | symbol) => {
    ValidateIf((obj) => obj[propertyKey] !== null, options)(
      prototype,
      propertyKey,
    );
  };
