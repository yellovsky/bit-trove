// global modules
import type { FC } from 'react';
import { Link } from '@bit-trove/ui/link';
import type { QueryKeyOf } from '@bit-trove/api-models/common';
import { useQuery } from '@tanstack/react-query';
import { fetchThoughtSegmentCollection, thoughtLink } from '@bit-trove/api-models/thought';

interface ThoughtsTimelineProps {
  queryKey: QueryKeyOf<typeof fetchThoughtSegmentCollection>;
}

export const ThoughtsTimeline: FC<ThoughtsTimelineProps> = ({ queryKey }) => {
  const { data, status } = useQuery({
    queryFn: fetchThoughtSegmentCollection,
    queryKey,
  });

  return (
    <div>
      status: {status}
      <br />
      {data?.data.map((resp) => (
        <Link color="teal.500" key={resp.id} to={thoughtLink(resp.attributes)}>
          {resp.attributes.title}
        </Link>
      ))}
      <br />
      data: {JSON.stringify(data)}
    </div>
  );
};
