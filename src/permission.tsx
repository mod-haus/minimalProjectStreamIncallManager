import {Platform, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

const Permission = {
  request: () =>
    requestMultiple(
      Platform.select({
        ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
        android: [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        ],
        default: [],
      }),
    ),
  check: () =>
    checkMultiple(
      Platform.select({
        ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
        android: [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        ],
        default: [],
      }),
    ),
};

const isGranted = (status: PermissionStatus) => status === RESULTS.GRANTED;

const PermissionScreen = ({moveToNext}: {moveToNext: () => void}) => {
  const onPress = () => {
    Permission.request()
      .then(result => Object.values(result).every(isGranted))
      .then(allGranted => {
        if (allGranted) {
          moveToNext();
        }
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: '#c8c8c8',
          marginBottom: 20,
        }}
        onPress={onPress}>
        <Text style={{textAlign: 'center'}}>Request Permission</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PermissionScreen;
