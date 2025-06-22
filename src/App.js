import React, { useEffect, useRef } from 'react'; import AgoraRTC from 'agora-rtc-sdk-ng'; import io from 'socket.io-client';

const socket = io('https://your-server-url'); const APP_ID = process.env.REACT_APP_AGORA_APP_ID;

function App() { const client = useRef(null); const localAudioTrack = useRef(null);

useEffect(() => { async function startAgora() { client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }); await client.current.join(APP_ID, 'ludo-room', null, null); localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack(); await client.current.publish([localAudioTrack.current]); }

startAgora();

return () => {
  if (localAudioTrack.current) localAudioTrack.current.stop();
  if (client.current) client.current.leave();
};

}, []);

return ( <div> <h1>Ludo with Voice</h1> <p>Voice chat active. Start playing!</p> </div> ); }

export default App;
