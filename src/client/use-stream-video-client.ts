import { StreamVideoClient, type User } from '@stream-io/video-react-native-sdk';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { QUERY_KEY } from './query-client';
import CONFIG from './config';

export const useStreamVideoClient = ({
  token,
  user,
}: { token: string; user: User }) => {
  const { data: client } = useSuspenseQuery({
    queryKey: [QUERY_KEY.GET_STREAM, QUERY_KEY.VIDEO_CLIENT, token, user.id],
    queryFn: async () => {
      const result = StreamVideoClient.getOrCreateInstance({
        apiKey: CONFIG.GET_STREAM_API_KEY,
        token: token,
        user: user,
      });
      await result.connectUser(user, token);
      return result;
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    return () => {
      if (client?.streamClient.user) {
        client.disconnectUser();
      }
    };
  }, [client]);

  return client;
};
