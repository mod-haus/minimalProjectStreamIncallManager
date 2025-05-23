# Stream.io Bluetooth Audio Test Project

This is a minimal test project to reproduce issues with Stream.io's audio input/output when connected to Bluetooth devices.

## Setup Instructions

Update the following configuration values in `src/client/config.ts`:

```typescript
const CONFIG = {
  GET_STREAM_API_KEY: 'YOUR_STREAM_API_KEY',
  TOKEN: 'YOUR_STREAM_TOKEN',
  USER_ID: 'YOUR_USER_ID',
  CALL_ID: 'YOUR_CALL_ID',
}
```

### Required Configuration Values

- `GET_STREAM_API_KEY`: Your Stream.io API key
- `TOKEN`: Your Stream.io JWT token
- `USER_ID`: User ID
- `CALL_ID`: Call ID

## Issue Description

This project is designed to test and reproduce issues with Stream.io's audio input/output functionality when connected to Bluetooth devices. It helps identify and debug problems where audio input/output fails to work properly despite having an active Bluetooth connection.
