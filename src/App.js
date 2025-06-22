import React, { useEffect, useRef } from 'react'; import AgoraRTC from 'agora-rtc-sdk-ng'; import io from 'socket.io-client';

const socket = io('https://730e20e6-4ba3-454c-840f-a3b493a940e7-00-38ssctzgdba5e.pike.replit.dev'); const APP_ID = process.env.09109bfa8e3647879efbe0546d681e87;

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
