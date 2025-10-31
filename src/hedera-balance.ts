import { Client, AccountBalanceQuery, AccountId, PrivateKey } from "@hashgraph/sdk";

// Load from .env.local
const accountId = import.meta.env.VITE_MY_ACCOUNT_ID;
const privateKey = import.meta.env.VITE_MY_PRIVATE_KEY;

if (!accountId || !privateKey) {
  throw new Error("❌ Missing Hedera credentials in .env.local");
}

async function checkBalance() {
  // Create client for testnet
  const client = Client.forTestnet();
  client.setOperator(AccountId.fromString(accountId), PrivateKey.fromString(privateKey));

  // Query your account balance
  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  console.log(`💰 Account ${accountId} has ${balance.hbars.toString()} HBAR`);
}

checkBalance().catch(console.error);
