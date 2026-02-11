import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Authorize = () => {
  const [authorized, setAuthorized] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (authorized && agreed) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md gradient-border">
        <div className="rounded-xl bg-card p-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="mb-2 text-center text-xl font-bold text-foreground">The Handshake</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            A one-way bridge will be established to pull assets into your ODHex Vault.
          </p>

          {/* Authorization Toggle */}
          <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
            <span className="text-sm font-medium text-foreground">
              Do you want to authorize this exchanger?
            </span>
            <button
              onClick={() => setAuthorized(!authorized)}
              className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
                authorized
                  ? "bg-gradient-to-r from-primary to-secondary"
                  : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-foreground shadow-md transition-transform duration-300 ${
                  authorized ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Terms */}
          <label className="mb-8 flex cursor-pointer items-start gap-3">
            <div className="pt-0.5">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  agreed
                    ? "border-primary bg-primary"
                    : "border-border bg-muted"
                }`}
              >
                {agreed && (
                  <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              I agree to the <span className="text-primary cursor-pointer hover:text-primary/80">Terms & Agreements</span> and understand that this creates a one-way asset bridge.
            </span>
          </label>

          <button
            onClick={handleConfirm}
            disabled={!authorized || !agreed}
            className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
              authorized && agreed
                ? "gradient-btn"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Confirm Authorization
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authorize;
