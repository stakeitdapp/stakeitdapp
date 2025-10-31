import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  TransferTransaction,
} from "@hashgraph/sdk";

dotenv.config();

const app = express();
app.use(express.json());

// Create Hedera client
const client = Client.forTestnet();
client.setOperator(
  AccountId.fromString(process.env.VITE_MY_ACCOUNT_ID!),
  PrivateKey.fromString(process.env.VITE_MY_PRIVATE_KEY!)
);

// POST /api/send-hbar
app.post("/api/send-hbar", async (req: Request, res: Response) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount) {
      return res.status(400).json({ error: "Missing 'to' or 'amount'" });
    }

    // Create HBAR transfer transaction
    const transaction = await new TransferTransaction()
      .addHbarTransfer(process.env.VITE_MY_ACCOUNT_ID!, new Hbar(-amount))
      .addHbarTransfer(to, new Hbar(amount))
      .execute(client);

    // Get receipt
    const receipt = await transaction.getReceipt(client);

    res.json({
      status: receipt.status.toString(),
      transactionId: transaction.transactionId.toString(),
    });
  } catch (error) {
    console.error("❌ HBAR Transfer Error:", error);
    res.status(500).json({ error: "Failed to send HBAR", details: String(error) });
  }
});

// Run server
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🚀 Hedera API running on http://localhost:${PORT}`)
);
