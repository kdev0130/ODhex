import { ArrowDown, ArrowUpRight } from "lucide-react";
import AppLayout from "@/components/AppLayout";

type Transaction = {
  id: string;
  type: "PULL" | "WITHDRAW";
  amount: number;
  status: "Completed" | "Processing" | "Sent";
  date: string;
  destination?: string;
};

const mockTransactions: Transaction[] = [
  { id: "1", type: "PULL", amount: 12500, status: "Completed", date: "2026-02-11" },
  { id: "2", type: "WITHDRAW", amount: 5000, status: "Sent", date: "2026-02-10", destination: "GCash" },
  { id: "3", type: "WITHDRAW", amount: 3000, status: "Completed", date: "2026-02-09", destination: "BDO" },
  { id: "4", type: "PULL", amount: 8000, status: "Completed", date: "2026-02-08" },
  { id: "5", type: "WITHDRAW", amount: 2000, status: "Processing", date: "2026-02-07", destination: "Maya" },
  { id: "6", type: "PULL", amount: 5000, status: "Completed", date: "2026-02-05" },
];

const statusColor: Record<Transaction["status"], string> = {
  Completed: "text-success",
  Processing: "text-processing",
  Sent: "text-warning",
};

const Ledger = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">The Ledger</h1>
        <p className="mt-1 text-sm text-muted-foreground">Complete history of your vault activity</p>
      </div>

      <div className="space-y-3">
        {mockTransactions.map((tx) => (
          <div key={tx.id} className="glass-card-hover flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full ${
                tx.type === "PULL" ? "bg-primary/10" : "bg-secondary/10"
              }`}>
                {tx.type === "PULL" ? (
                  <ArrowDown size={16} className="text-primary sm:hidden" />
                ) : (
                  <ArrowUpRight size={16} className="text-secondary sm:hidden" />
                )}
                {tx.type === "PULL" ? (
                  <ArrowDown size={18} className="text-primary hidden sm:block" />
                ) : (
                  <ArrowUpRight size={18} className="text-secondary hidden sm:block" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {tx.type}{tx.destination ? ` → ${tx.destination}` : ""}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-xs sm:text-sm font-bold text-foreground font-mono">
                {tx.type === "PULL" ? "+" : "-"}{tx.amount.toLocaleString()} KOLI
              </p>
              <p className={`text-[10px] sm:text-xs font-medium ${statusColor[tx.status]}`}>
                {tx.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Ledger;
