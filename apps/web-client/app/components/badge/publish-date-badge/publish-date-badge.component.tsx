// global modules
import type { FC } from 'react';
import { Icon } from '@repo/ui/icon';
import { useTranslation } from 'react-i18next';
import { Tag, TagLabel, TagLeftIcon } from '@repo/ui/tag';

interface PublishDateBadgeProps {
  date: string | number | Date;
}

export const PublishDateBadge: FC<PublishDateBadgeProps> = ({ date }) => {
  const { t } = useTranslation();

  return (
    <Tag colorScheme="gray" variant="borderless">
      <TagLeftIcon>
        <Icon type="clock" />
      </TagLeftIcon>
      <TagLabel>
        {t('published on {date}', {
          date: new Date(date),
          formatParams: {
            date: { day: 'numeric', month: 'short', year: 'numeric' },
          },
        })}
      </TagLabel>
    </Tag>
  );
};
