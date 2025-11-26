"use client";
import { useState } from "react";
import Link from "next/link";
import { FaUserAstronaut, FaRocket, FaBoxOpen, FaUsers, FaSitemap, FaRightFromBracket, FaFileInvoiceDollar } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import LoginModal from "@/components/features/auth/LoginModal";
import clsx from "clsx";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const actions = [
    {
      label: "Create Order",
      icon: FaFileInvoiceDollar,
      href: "/purchase-orders/create",
      description: "Request new materials",
      guestAllowed: true,
      color: "bg-blue-500/20 hover:bg-blue-500/40 border-blue-500/50",
    },
    {
      label: "View Orders",
      icon: FaBoxOpen,
      href: "/purchase-orders",
      description: "Check status & history",
      guestAllowed: true, // Guest can view list (limited)
      color: "bg-purple-500/20 hover:bg-purple-500/40 border-purple-500/50",
    },
    {
      label: "Inventory",
      icon: FaSitemap,
      href: "/inventory",
      description: "Manage stocks & sizes",
      guestAllowed: false, // Admin only
      color: "bg-emerald-500/20 hover:bg-emerald-500/40 border-emerald-500/50",
    },
    {
      label: "Customers",
      icon: FaUsers,
      href: "/customers",
      description: "Customer database",
      guestAllowed: false, // Admin only
      color: "bg-orange-500/20 hover:bg-orange-500/40 border-orange-500/50",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col p-6 md:p-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-space-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-space-800/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-space-300 to-space-500 flex items-center justify-center shadow-lg shadow-space-500/20">
            {/* Logo Placeholder */}
            <FaRocket className="text-space-900 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-white">LAST MANAGEMENT</h1>
        </div>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-space-300">
                Hello, <span className="font-bold text-white">{user?.username}</span>
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/50 text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <FaRightFromBracket />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-space-800/80 border border-space-500 text-space-300 hover:text-white hover:border-space-300 transition-all shadow-lg hover:shadow-space-500/20"
            >
              <FaUserAstronaut className="group-hover:scale-110 transition-transform" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-300 via-white to-space-300 pb-2">
            Welcome Manager
          </h2>
          <p className="text-xl md:text-2xl text-space-300/80 font-light">
            Last Management System
          </p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-space-500 to-transparent" />
        </div>

        <div className="w-full">
          <h3 className="text-center text-lg text-space-500 uppercase tracking-widest mb-8 font-bold">
            What do you want to do?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => {
              // Hide admin-only actions if not authenticated
              if (!action.guestAllowed && !isAuthenticated) return null;

              return (
                <Link
                  key={index}
                  href={action.href}
                  className={clsx(
                    "group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2",
                    action.color,
                    !isAuthenticated && "lg:col-span-2 aspect-[2/1]" // Make buttons bigger for guest
                  )}
                >
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div className="p-3 w-fit rounded-lg bg-space-900/50 text-white group-hover:scale-110 transition-transform">
                      <action.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-space-300 transition-colors">
                        {action.label}
                      </h4>
                      <p className="text-sm text-space-300/70">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <footer className="relative z-10 mt-12 text-center text-space-500 text-sm">
        <p>© 2024 Last Management System. All systems operational.</p>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
}