// src/components/ConnectButton.tsx
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, projectId, metadata } from "../hooks/wagmi";
import { monadTestnet } from "@reown/appkit/networks";

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

export default function ConnectButton() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-[#ffffff] rounded-xl p-2 shadow-lg">
      <appkit-button balance="hide" />
    </div>
  );
}
