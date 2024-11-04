// global modules
import type { LogLevel } from 'effect';

// common modules
import type { AppAbility } from 'src/types/ability';
import type { GetTranslationsStrategy } from 'src/utils/translation-strategy';
import type { PrismaTransaction } from 'src/types/prisma-transaction';

export interface RepositoryContext {
  tx: PrismaTransaction | null;
}

export interface AccessControlContext {
  user: null;
  can: AppAbility['can'];
}

export interface SerializerContext {
  readonly getTranslations: GetTranslationsStrategy;
}

export interface SerializeItemsListParams<TItem> {
  items: TItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface RequestContext
  extends RepositoryContext,
    SerializerContext,
    AccessControlContext {
  logLevel: LogLevel.LogLevel | undefined;
}
