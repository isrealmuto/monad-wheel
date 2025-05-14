import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, projectId, metadata } from "./hooks/wagmi";
import { monadTestnet } from "@reown/appkit/networks";
import SpinWheel from "./components/SpinWheel";

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [monadTestnet],
  defaultNetwork: monadTestnet,
  metadata,
  themeMode: "dark",
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
});

function App() {
  const [frameAdded, setFrameAdded] = useState(false);

  useEffect(() => {
    sdk.actions.ready(); // Make sure Farcaster SDK is ready
  }, []);

  const addFrame = async () => {
    try {
      await sdk.actions.addFrame(); // Call without any parameters
      setFrameAdded(true); // Mark as frame added
      alert("Frame added successfully! Now you can access the SpinWheel.");
    } catch (err) {
      console.error("Failed to add frame", err);
      alert("Failed to add frame. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      <h1 className="text-2xl font-bold mb-6">🎯 Spin & Win MON</h1>
      <appkit-button balance="hide" />

      {!frameAdded ? (
        // Show the "Add Frame" button before accessing SpinWheel
        <button
          onClick={addFrame}
          className="bg-purple-300 hover:bg-purple-400 text-white px-6 py-3 rounded-2xl shadow-lg shadow-purple-700"
        >
          Add Frame
        </button>
      ) : (
        // After adding the frame, show the SpinWheel
        <SpinWheel />
      )}
    </div>
  );
}

export default App;
