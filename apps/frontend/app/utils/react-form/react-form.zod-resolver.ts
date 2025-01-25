// global modules
import type { TFunction } from 'i18next';
import { toNestErrors } from '@hookform/resolvers';
import type zod from 'zod';

import {
  appendErrors,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Resolver,
} from 'react-hook-form';

// common modules
import { getErrorMessage } from '~/utils/translate/zod-translate-error';

const parseErrorSchema = (
  zodT: TFunction<'zod'>,
  zodErrors: zod.ZodIssue[],
  validateAllFieldCriteria: boolean,
) => {
  const errors: Record<string, FieldError> = {};

  for (; zodErrors.length; ) {
    const error = zodErrors[0];
    const _path = error.path.join('.');

    if (!errors[_path]) {
      if ('unionErrors' in error) {
        const unionError = error.unionErrors[0].errors[0];

        errors[_path] = {
          message: getErrorMessage(zodT, unionError),
          type: unionError.code,
        };
      } else {
        errors[_path] = { message: getErrorMessage(zodT, error), type: error.code };
      }
    }

    if ('unionErrors' in error) {
      error.unionErrors.forEach(unionError => unionError.errors.forEach(e => zodErrors.push(e)));
    }

    if (validateAllFieldCriteria) {
      const types = errors[_path].types;
      const messages = types && types[error.code];

      errors[_path] = appendErrors(
        _path,
        validateAllFieldCriteria,
        errors,
        error.code,
        messages ? ([] as string[]).concat(messages as string[], error.message) : error.message,
      ) as FieldError;
    }

    zodErrors.shift();
  }

  return errors;
};

export const zodResolver =
  <TFieldValues extends FieldValues, TContext = unknown>(
    zodT: TFunction<'zod'>,
    schema: zod.ZodType<TFieldValues>,
  ): Resolver<TFieldValues, TContext> =>
  async (values, _, options) => {
    const parsed = await schema.safeParseAsync(values);
    if (parsed.success) return { errors: {} as FieldErrors, values: parsed.data };

    const errors = toNestErrors(
      parseErrorSchema(
        zodT,
        parsed.error.errors,
        !options.shouldUseNativeValidation && options.criteriaMode === 'all',
      ),
      options,
    );

    return { errors, values: {} };
  };
