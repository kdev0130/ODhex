import { useState } from "react";
import { ArrowDown, Zap } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const Dashboard = () => {
  const [vaultBalance, setVaultBalance] = useState(5000);
  const [externalBalance, setExternalBalance] = useState(12500);
  const [pulling, setPulling] = useState(false);

  const handlePull = () => {
    if (externalBalance <= 0) return;
    setPulling(true);
    setTimeout(() => {
      setVaultBalance((prev) => prev + externalBalance);
      setExternalBalance(0);
      setPulling(false);
    }, 2000);
  };

  return (
    <AppLayout>
      {/* Vault Balance */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-1 text-xs sm:text-sm text-muted-foreground">KOLI Vault Balance</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground neon-glow">
          {vaultBalance.toLocaleString()}{" "}
          <span className="text-xl sm:text-2xl md:text-3xl text-muted-foreground">KOLI</span>
        </h1>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {/* External Reflected Balance */}
        <div className="glass-card p-4 sm:p-6">
          <div className="mb-3 sm:mb-4 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse-neon rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground">Linked External Assets</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            {externalBalance.toLocaleString()}{" "}
            <span className="text-base sm:text-lg text-muted-foreground">KOLI</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Reflected from authorized exchanger
          </p>
        </div>

        {/* Vault Info */}
        <div className="glass-card p-4 sm:p-6">
          <div className="mb-3 sm:mb-4 flex items-center gap-2">
            <Zap size={14} className="text-secondary" />
            <span className="text-xs sm:text-sm text-muted-foreground">Vault Status</span>
          </div>
          <p className="text-base sm:text-lg font-medium text-foreground">Bridge Active</p>
          <p className="mt-1 text-xs text-muted-foreground">
            One-way bridge established. Assets can only flow inward.
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs text-success">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            Authorized & Connected
          </div>
        </div>
      </div>

      {/* Pull Button */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <button
          onClick={handlePull}
          disabled={pulling || externalBalance <= 0}
          className={`group flex items-center gap-3 rounded-2xl px-8 py-4 sm:px-12 sm:py-5 text-base sm:text-lg font-bold transition-all ${
            pulling || externalBalance <= 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "gradient-btn"
          }`}
        >
          <ArrowDown
            size={24}
            className={pulling ? "animate-bounce" : "group-hover:animate-bounce"}
          />
          {pulling ? "Pulling Assets..." : "PULL ASSETS"}
        </button>
      </div>
      {externalBalance > 0 && (
        <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">
          Pull {externalBalance.toLocaleString()} KOLI into your Vault
        </p>
      )}
      {externalBalance <= 0 && vaultBalance > 0 && (
        <p className="mt-3 text-center text-xs sm:text-sm text-success">
          All assets have been pulled into your Vault ✓
        </p>
      )}
    </AppLayout>
  );
};

export default Dashboard;
