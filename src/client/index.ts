import type { User } from '@stream-io/video-react-native-sdk';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStreamVideoClient } from './use-stream-video-client';
import { QUERY_KEY } from './query-client';

export const useVideoClient = ({
  token,
  user,
  callId,
}: { token: string; user: User; callId: string }) => {
  const client = useStreamVideoClient({ token, user });

  const { data: call } = useSuspenseQuery({
    queryKey: [QUERY_KEY.GET_STREAM, QUERY_KEY.CALL, callId, user.id, token],
    queryFn: async () => {
      //   const result = await client
      //     .queryCalls({
      //       filter_conditions: { id: callId },
      //     })
      //     .then(callList => {
      //       if (callList.calls.length <= 0) {
      //         throw new Error('Call not found')
      //       }
      //       return callList.calls[0]
      //     })
      const result = client.call('livestream', callId);

      await result.join();
      return result;
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    return () => {
      const clear = async () => {
        await call?.leave();
      };
      clear();
    };
  }, [call]);

  return { client, call };
};
