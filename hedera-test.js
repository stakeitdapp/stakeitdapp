import { Client, Hbar } from "@hashgraph/sdk";

async function main() {
  console.log("✅ Hedera SDK is working!");

  // Create a test client for the Hedera Testnet
  const client = Client.forTestnet();

  // Example: set a max transaction fee (optional)
  client.setMaxTransactionFee(new Hbar(2));

  console.log("🌐 Client created successfully.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
});

