import React, {useState} from 'react';
import {View} from 'react-native';
import PermissionScreen from './src/permission';
import StreamingScreen from './src/stream';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/client/query-client';

function App(): React.JSX.Element {
  const [appState, setAppState] = useState<'permission' | 'main'>('permission');
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{flex: 1}}>
        {appState === 'permission' ? (
          <PermissionScreen moveToNext={() => setAppState('main')} />
        ) : (
          <StreamingScreen />
        )}
      </View>
    </QueryClientProvider>
  );
}

export default App;
