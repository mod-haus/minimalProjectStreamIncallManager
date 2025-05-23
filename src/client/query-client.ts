import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default queryClient;

export const QUERY_KEY = {
  GET_STREAM: 'get-stream',
  VIDEO_CLIENT: 'video-client',
  CALL: 'call',
};
