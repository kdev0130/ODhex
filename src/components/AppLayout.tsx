import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowDownToLine, ScrollText, LogOut } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Vault", icon: LayoutDashboard },
  { to: "/withdraw", label: "Withdraw", icon: ArrowDownToLine },
  { to: "/ledger", label: "Ledger", icon: ScrollText },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Top Nav — hidden on mobile */}
      <nav className="fixed left-0 right-0 top-0 z-40 hidden border-b border-border bg-background/80 backdrop-blur-xl sm:block">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/dashboard" className="text-lg font-bold gradient-text">
            ODHex
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              to="/signin"
              className="ml-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar — logo + logout only */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:hidden">
        <Link to="/dashboard" className="text-lg font-bold gradient-text">
          ODHex
        </Link>
        <Link
          to="/signin"
          className="flex items-center gap-1.5 rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
        </Link>
      </div>

      {/* Content — adjust padding for mobile bottom nav */}
      <main className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:pt-20 sm:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl sm:hidden">
        <div className="flex items-stretch justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        {/* Safe area for notched phones */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
};

export default AppLayout;
