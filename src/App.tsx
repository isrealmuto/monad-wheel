import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
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

   useEffect(() => {
    sdk.actions.ready(); 
  }, []); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6
    bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
      <h1 className="text-2xl font-bold mb-6">🎯 Spin & Win MON</h1>
      <appkit-button balance="hide" />
      <SpinWheel />
      
    </div>
  );
}

  

  

   




export default App;