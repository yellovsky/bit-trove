// global modules
import * as R from 'ramda';
import zod from 'zod';

export const getSchemaDefaultValue = <TSchema extends zod.ZodType>(
  schema: TSchema,
): zod.infer<TSchema> => {
  if (schema instanceof zod.ZodEffects) return getSchemaDefaultValue(schema.innerType());

  const parsed = schema.safeParse({});
  if (parsed.success) return parsed.data;

  if (schema instanceof zod.ZodNullable) return null;
  if (schema instanceof zod.ZodOptional) return undefined;

  if (schema instanceof zod.ZodString) return '';
  if (schema instanceof zod.ZodNumber) return 0;
  if (schema instanceof zod.ZodNaN) return NaN;
  if (schema instanceof zod.ZodBoolean) return false;
  if (schema instanceof zod.ZodDate) return new Date();
  if (schema instanceof zod.ZodUndefined) return undefined;
  if (schema instanceof zod.ZodNull) return null;

  if (schema instanceof zod.ZodArray) {
    const minLength = schema._def.minLength?.value || 0;
    return R.repeat(getSchemaDefaultValue(schema.element), minLength);
  }

  if (schema instanceof zod.ZodObject) {
    return R.mapObjIndexed((a: zod.ZodType) => getSchemaDefaultValue(a), schema.shape);
  }

  console.warn('Cannot get default value for schema', schema);
  return undefined;
};
