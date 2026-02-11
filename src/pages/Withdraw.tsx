import { useState } from "react";
import { Wallet, Building2, ChevronRight } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const ewallets = ["GCash", "Maya", "Coins.ph"];
const banks = ["BDO", "BPI", "UnionBank", "Metrobank", "LandBank"];

type Method = "ewallet" | "bank";

const Withdraw = () => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<Method | null>(null);
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const vaultBalance = 17500;

  const handleConfirm = () => {
    setStep(4); // success
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Withdrawal Hub</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Off-ramp your KOLI to real-world funds at 1:1 value (1 KOLI = 1 PHP)
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        {/* Steps indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  step >= s
                    ? "gradient-btn"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`h-0.5 w-8 transition-colors ${step > s ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Choose Method</h2>
            <button
              onClick={() => { setMethod("ewallet"); setStep(2); }}
              className="glass-card-hover flex w-full items-center justify-between p-5"
            >
              <div className="flex items-center gap-3">
                <Wallet size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">E-Wallet</p>
                  <p className="text-xs text-muted-foreground">GCash, Maya, Coins.ph</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => { setMethod("bank"); setStep(2); }}
              className="glass-card-hover flex w-full items-center justify-between p-5"
            >
              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-secondary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Bank Transfer</p>
                  <p className="text-xs text-muted-foreground">BDO, BPI, UnionBank, etc.</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-foreground">
              {method === "ewallet" ? "Select E-Wallet" : "Select Bank"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(method === "ewallet" ? ewallets : banks).map((p) => (
                <button
                  key={p}
                  onClick={() => { setProvider(p); }}
                  className={`rounded-lg border p-3 text-sm font-medium transition-all ${
                    provider === p
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">Amount (KOLI)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Available: {vaultBalance.toLocaleString()} KOLI — You'll receive ₱{amount ? Number(amount).toLocaleString() : "0"}
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                {method === "ewallet" ? "Mobile Number" : "Account Number"}
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={method === "ewallet" ? "09XX XXX XXXX" : "Account number"}
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!provider || !amount || !accountDetails}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold ${
                  provider && amount && accountDetails
                    ? "gradient-btn"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Review
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-foreground">Confirm Withdrawal</h2>
            <div className="glass-card divide-y divide-border">
              <div className="flex justify-between p-4">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium text-foreground">{provider}</span>
              </div>
              <div className="flex justify-between p-4">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium text-foreground">{Number(amount).toLocaleString()} KOLI</span>
              </div>
              <div className="flex justify-between p-4">
                <span className="text-sm text-muted-foreground">You Receive</span>
                <span className="text-sm font-bold gradient-text">₱{Number(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-4">
                <span className="text-sm text-muted-foreground">Account</span>
                <span className="text-sm font-medium text-foreground">{accountDetails}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back
              </button>
              <button onClick={handleConfirm} className="gradient-btn flex-1 rounded-lg px-4 py-2.5 text-sm">
                Confirm Withdrawal
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">Withdrawal Submitted</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {Number(amount).toLocaleString()} KOLI → ₱{Number(amount).toLocaleString()} via {provider}
            </p>
            <button
              onClick={() => { setStep(1); setMethod(null); setProvider(""); setAmount(""); setAccountDetails(""); }}
              className="gradient-btn rounded-lg px-6 py-2.5 text-sm"
            >
              New Withdrawal
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Withdraw;
