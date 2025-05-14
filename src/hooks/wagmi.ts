import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { http, injected } from "wagmi";
import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { monadTestnet } from '@reown/appkit/networks'
import { walletConnect } from "wagmi/connectors";


// Get projectId from https://cloud.reown.com
export const projectId = "bbbfb911266b81013644972186d56b46"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [monadTestnet]



//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [monadTestnet.id]: http()
  },
  ssr: true,
  projectId,
  networks,
  connectors: [
    farcasterFrame(),
    injected({
        shimDisconnect: true
    }),
    walletConnect({
        projectId,
        showQrModal: true,
    })
  ]
})

export const metadata = {
  name: "monad-mini-app",
  description: "Monad Mini App",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["/image.png"],
};



export const config = wagmiAdapter.wagmiConfig;