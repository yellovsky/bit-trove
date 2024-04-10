// global modules
import type { FC } from 'react';
import { Icon } from '@bit-trove/ui/icon';
import { SmallBadge } from '@bit-trove/ui/small-badge';
import { useTranslation } from 'react-i18next';

// local modules
import { holder as holderCn } from './views-badge.module.scss';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

export const PublishDateBadge: FC<{ date: number | string | Date }> = ({ date }) => {
  // const t = useTranslations();
  const { t, i18n } = useTranslation();
  i18n.format;
  return (
    <Tag size="md" boxShadow="none" variant="outline" colorScheme="gray">
      <TagLeftIcon boxSize="12px" mr={1} as={TimeIcon} />
      <TagLabel>
        {t('published on {date}', {
          date: new Date(date),
          formatParams: {
            date: { year: 'numeric', month: 'short', day: 'numeric' },
          },
        })}
      </TagLabel>
    </Tag>
  );
};
