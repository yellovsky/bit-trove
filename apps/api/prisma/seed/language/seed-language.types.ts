// global modules
import { Prisma } from '@prisma/client';

export const languageDataSelect = {
  code: true,
} satisfies Prisma.LanguageSelect;

export type LanguageData = Prisma.LanguageGetPayload<{
  select: typeof languageDataSelect;
}>;
