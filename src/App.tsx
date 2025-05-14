import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import SpinWheel from "./components/SpinWheel";
import Connect from "./components/Connect";



function App() {

   useEffect(() => {
    sdk.actions.ready(), sdk.actions.addFrame
() 
  }, 
  []); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-35">
      <h1 className="text-2xl font-bold mb-6">🎯 Spin & Win MON</h1>
      <Connect />
      <SpinWheel />
      
    </div>
  );
}

  

  

   




export default App;
