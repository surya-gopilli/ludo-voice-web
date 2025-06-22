import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "4f6320b6f4d64a75b2fbba6977ca23c0";

function App() {
  useEffect(() => {
    async function initAgora() {
      try {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        await client.join(APP_ID, "test-channel", null, null);
        const mic = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish([mic]);
        console.log("✅ Agora voice connected");
      } catch (err) {
        console.error("❌ Agora error:", err);
      }
    }

    initAgora();
  }, []);

  return (
    <div>
      <h1>Agora Voice Test</h1>
      <p>Check console for connection status</p>
    </div>
  );
}

export default App;
