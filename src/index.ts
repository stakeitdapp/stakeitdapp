import express from "express";
import cors from "cors";
import hederaService from "./services/hedera.service";

const app = express();
app.use(cors());
app.use(express.json());

// Goal endpoints
app.post("/api/goals", async (req, res) => {
  try {
    const { durationDays, descriptiveHash } = req.body;
    const result = await hederaService.executeContract("createGoal", [
      durationDays,
      descriptiveHash,
    ]);
    res.json({ success: true, receipt: result });
  } catch (error) {
    const msg = (error as any)?.message || String(error);
    res.status(500).json({ error: msg });
  }
});

app.get("/api/goals/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;
    const result = await hederaService.queryContract("goals", [goalId]);
    res.json({ success: true, result });
  } catch (error) {
    const msg = (error as any)?.message || String(error);
    res.status(500).json({ error: msg });
  }
});

// Voting endpoints
app.post("/api/votes", async (req, res) => {
  try {
    const { goalId, day, isValid } = req.body;
    const result = await hederaService.executeContract("castVote", [
      goalId,
      day,
      isValid,
    ]);
    res.json({ success: true, receipt: result });
  } catch (error) {
    const msg = (error as any)?.message || String(error);
    res.status(500).json({ error: msg });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
