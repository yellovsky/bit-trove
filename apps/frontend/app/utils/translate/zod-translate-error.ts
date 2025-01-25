// global modules
import type { TFunction } from 'i18next';
import type zod from 'zod';

export const getErrorMessage = (
  t: TFunction<'zod'>,
  error: zod.ZodIssueOptionalMessage,
): string => {
  if (error.code === 'too_small') {
    if (error.type === 'string') {
      if (error.minimum === 1) return t('Required');
      else return t('At least {{num}} symbols', { num: error.minimum });
    }

    if (error.type === 'number') {
      if (error.minimum === 0) return t('Value must be a positive number');
    }
    if (error.type === 'array') {
      if (error.minimum === 1) return t('List must not be empty');
    }
  }

  if (error.code === 'invalid_type') {
    if (error.received === 'null') return t('Required');
    if (error.received === 'undefined') return t('Required');
  }

  if (error.code === 'invalid_union') {
    return t('Required');
  }

  if (error.code === 'invalid_string') {
    if (error.validation === 'email') return t('Invalid email format');
    if (error.validation === 'uuid') return t('Required');
  }

  console.warn('Unhandler error message', error);

  return t('Unknown');
};
