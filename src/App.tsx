import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CreateGoal from "./pages/CreateGoal";
import NotFound from "./pages/NotFound";
import React, { useEffect, useState } from "react";
import { HashConnect, HashConnectTypes } from "hashconnect";
import { Button } from "@/components/ui/button"; // ✅ ShadCN button

const queryClient = new QueryClient();

// 🔗 Hedera wallet setup
const appMetadata: HashConnectTypes.AppMetadata = {
  name: "StakeIt DApp",
  description: "A decentralized staking app on Hedera",
  icon: "https://hashpack.app/favicon.png",
};

const network = "testnet";
const hashconnect = new HashConnect();

const App = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      console.log("🔗 Initializing HashConnect...");
      const initData = await hashconnect.init(appMetadata, network, false);

      // Open HashPack popup automatically
      hashconnect.connectToLocalWallet();

      // Listen for wallet pairing
      hashconnect.pairingEvent.on((data) => {
        console.log("✅ Wallet paired:", data);
        if (data.accountIds.length > 0) {
          setAccount(data.accountIds[0]);
          setIsConnecting(false);
        }
      });
    } catch (err) {
      console.error("❌ Wallet connection error:", err);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    // Auto reconnect if already paired
    hashconnect.pairingEvent.on((data) => {
      if (data.accountIds.length > 0) {
        setAccount(data.accountIds[0]);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* 🌐 ShadCN-styled floating wallet button */}
          <div className="fixed top-4 right-4 z-50">
            {!account ? (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-green-600 border-green-500 hover:bg-green-50 cursor-default"
              >
                💼 {account}
              </Button>
            )}
          </div>

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-goal" element={<CreateGoal />} />
            <Route path="/how-it-works" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
