import {ActivityIndicator, SafeAreaView} from 'react-native';
import {useVideoClient} from './client';
import CONFIG from './client/config';
import {Suspense, useEffect} from 'react';
import {
  StreamCall,
  StreamVideo,
  useCallStateHooks,
  VideoRenderer,
} from '@stream-io/video-react-native-sdk';
import inCallManager from 'react-native-incall-manager';

const StreamingScreen = () => {
  
  useEffect(() => {
    inCallManager.start({media: 'video'});
    return () => {
      inCallManager.stop();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Suspense
        fallback={
          <ActivityIndicator style={{flex: 1, backgroundColor: 'black'}} />
        }>
        <StreamingContent />
      </Suspense>
    </SafeAreaView>
  );
};

export default StreamingScreen;

const StreamingContent = () => {
  const {client, call} = useVideoClient({
    token: CONFIG.TOKEN,
    user: {id: CONFIG.USER_ID},
    callId: CONFIG.CALL_ID,
  });

  return (
    <StreamVideo client={client} language="en">
      <StreamCall call={call}>
        <Renderer />
      </StreamCall>
    </StreamVideo>
  );
};

const Renderer = () => {
  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  return (
    localParticipant && (
      <VideoRenderer
        participant={localParticipant}
        trackType="videoTrack"
        objectFit="contain"
        videoZOrder={1}
      />
    )
  );
};
