import * as zod from 'zod';

export const localeSchema = zod.string().min(1);
