import { HashConnect, HashConnectTypes } from "hashconnect";

const appMetadata: HashConnectTypes.AppMetadata = {
  name: "StakeIt DApp",
  description: "A decentralized staking app on Hedera",
  icon: "https://hashpack.app/favicon.png",
};

const network = "testnet";

export const hashconnect = new HashConnect();
export let pairingData: HashConnectTypes.SavedPairingData | null = null;

export async function initHashConnect() {
  console.log("🔗 Initializing HashConnect...");

  const initData = await hashconnect.init(appMetadata, network, false);
  pairingData = initData.pairingData;

  const pairingString = hashconnect.generatePairingString(
    network,
    initData.topic,
    false
  );
  console.log("📱 Scan this pairing string in HashPack Wallet:\n", pairingString);

  hashconnect.pairingEvent.on((data) => {
    console.log("✅ Wallet paired:", data);
  });

  hashconnect.connectionStatusChangeEvent.on((status) => {
    console.log("🔄 Connection status:", status);
  });

  hashconnect.connectToLocalWallet();
}
