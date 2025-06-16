import { TagsInput as MantineTagsInput, type TagsInputProps as MantineTagsInputProps } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAllTagsQuery } from '../api/get-all-tags';

type TagsInputProps = Omit<MantineTagsInputProps, 'data'>;

export const TagsInput: FC<TagsInputProps> = (props) => {
  const { data: tagsData } = useAllTagsQuery({});
  const { t: tCms } = useTranslation('cms');

  const data = tagsData?.data.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  return (
    <MantineTagsInput
      {...props}
      aria-label={props['aria-label'] || tCms('tags_input.aria_label')}
      data={data}
      description={props.description || tCms('tags_input.description')}
      label={props.label || tCms('tags_input.label')}
      placeholder={props.placeholder || tCms('tags_input.placeholder')}
    />
  );
};
