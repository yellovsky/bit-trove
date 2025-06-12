import { Skeleton, Text, Timeline } from '@mantine/core';
import type { FC } from 'react';

export const ThoughtTimelineItemPending: FC = () => (
  <Timeline.Item
    bullet
    title={
      <Skeleton w="90%">
        <Text>&nbsp;</Text>
      </Skeleton>
    }
  >
    <Skeleton mb="0.25rem" w="70%">
      <Text size="sm">&nbsp;</Text>
    </Skeleton>
    <Skeleton w="80%">
      <Text size="sm">&nbsp;</Text>
    </Skeleton>
    <Skeleton mt={4} w="150">
      <Text size="xs">&nbsp;</Text>
    </Skeleton>
  </Timeline.Item>
);
