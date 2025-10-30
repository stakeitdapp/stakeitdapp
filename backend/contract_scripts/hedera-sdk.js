import { Client, AccountBalanceQuery, Hbar } from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();

const client = Client.forName(process.env.HEDERA_NETWORK)
  .setOperator(process.env.OPERATOR_ID, process.env.OPERATOR_KEY);

async function main() {
  const balance = await new AccountBalanceQuery()
    .setAccountId(process.env.OPERATOR_ID)
    .execute(client);

  console.log(`Balance: ${balance.hbars.toString()}`);
}

main().catch(console.error);

