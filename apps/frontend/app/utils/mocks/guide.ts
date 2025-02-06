// global modules
import * as R from 'ramda';
import type { DeepPartial } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import type { GuideItemSegment } from '@repo/api-models';

export const makeGuideSegmentMock = (initial?: DeepPartial<GuideItemSegment>): GuideItemSegment =>
  R.mergeDeepLeft(initial || {}, {
    created_at: faker.date.past().toISOString(),
    id: faker.string.uuid(),
    language_code: faker.helpers.arrayElement(['en', 'ru']),
    language_codes: ['en', 'ru'],
    original_language_code: faker.helpers.arrayElement(['en', 'ru']),
    published_at: faker.date.past().toISOString(),
    short_description: faker.lorem.paragraph(),
    slug: faker.lorem.word(),
    title: faker.lorem.sentence(),
  });
