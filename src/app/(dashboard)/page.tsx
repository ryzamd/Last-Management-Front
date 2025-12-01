"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserAstronaut, FaRocket, FaBoxOpen, FaUsers, FaSitemap, FaRightFromBracket, FaFileInvoiceDollar, FaTags, FaRulerCombined, FaBuilding, FaArrowDownUpAcrossLine, FaCube } from "react-icons/fa6";
import { useAuthStore } from '@/store/useAuthStore';
import LoginModal from "@/components/features/auth/LoginModal";
import { dashboardStyles } from "@/styles/dashboard.styles";
import InventoryMatrixTable from "@/components/features/reports/InventoryMatrixTable";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const actions = [
    {
      label: "Create Order",
      icon: FaFileInvoiceDollar,
      href: "/purchase-orders/create",
      guestAllowed: true,
      color: "bg-blue-500/20 hover:bg-blue-500/40 border-blue-500/50",
    },
    {
      label: "View Orders",
      icon: FaBoxOpen,
      href: "/purchase-orders",
      guestAllowed: true,
      color: "bg-purple-500/20 hover:bg-purple-500/40 border-purple-500/50",
    },
    {
      label: "Inventory",
      icon: FaSitemap,
      href: "/inventory",
      guestAllowed: true,
      color: "bg-emerald-500/20 hover:bg-emerald-500/40 border-emerald-500/50",
    },
    {
      label: "Stock Movements",
      icon: FaArrowDownUpAcrossLine,
      href: "/stock-movements",
      guestAllowed: false,
      color: "bg-teal-500/20 hover:bg-teal-500/40 border-teal-500/50",
    },
    {
      label: "Customers",
      icon: FaUsers,
      href: "/customers",
      guestAllowed: true,
      color: "bg-orange-500/20 hover:bg-orange-500/40 border-orange-500/50",
    },
    {
      label: "Departments",
      icon: FaBuilding,
      href: "/departments",
      guestAllowed: true,
      color: "bg-pink-500/20 hover:bg-pink-500/40 border-pink-500/50",
    },
    {
      label: "Last Models",
      icon: FaCube,
      href: "/last-models",
      guestAllowed: true,
      color: "bg-indigo-500/20 hover:bg-indigo-500/40 border-indigo-500/50",
    },
    {
      label: "Last Names",
      icon: FaTags,
      href: "/last-names",
      guestAllowed: true,
      color: "bg-cyan-500/20 hover:bg-cyan-500/40 border-cyan-500/50",
    },
    {
      label: "Last Sizes",
      icon: FaRulerCombined,
      href: "/last-sizes",
      guestAllowed: true,
      color: "bg-fuchsia-500/20 hover:bg-fuchsia-500/40 border-fuchsia-500/50",
    }
  ];

  if (!isMounted) {
      return null;
  }

  const CardContent = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className={dashboardStyles.card.inner}>
      <div className={dashboardStyles.card.iconBox}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className={dashboardStyles.card.title}>{label}</h4>
      </div>
    </div>
  );

  return (
    <main className={dashboardStyles.main}>
      <div className={dashboardStyles.bgDecor.top} />
      <div className={dashboardStyles.bgDecor.bottom} />

      {/* Header */}
      <header className={dashboardStyles.header.container}>
        <div className={dashboardStyles.header.logoWrapper}>
          <div className={dashboardStyles.header.logoIconBox}>
            <FaRocket className={dashboardStyles.header.logoIcon} />
          </div>
          <h1 className={dashboardStyles.header.brandName}>LAST MANAGEMENT</h1>
        </div>

        <div>
          {isAuthenticated ? (
            <div className={dashboardStyles.header.userSection}>
              <span className={dashboardStyles.header.welcomeText}>
                Hello, <span className={dashboardStyles.header.username}>{user?.username}</span>
              </span>
              <button onClick={logout} className={dashboardStyles.header.logoutBtn}>
                <FaRightFromBracket />
                LOGOUT
              </button>
            </div>
          ) : (
            <button onClick={() => setIsLoginOpen(true)} className={dashboardStyles.header.loginBtn}>
              <FaUserAstronaut className="group-hover:scale-110 transition-transform" />
              <span>ADMIN LOGIN</span>
            </button>
          )}
        </div>
      </header>

      <div className={dashboardStyles.content.container}>
        <div className={dashboardStyles.content.welcomeSection}>
          <h2 className={dashboardStyles.content.welcomeTitle}>Welcome Manager</h2>
          <p className={dashboardStyles.content.subTitle}>What do you want to do?</p>
          <div className={dashboardStyles.content.divider} />
        </div>

        <div className="w-full">
          <h3 className={dashboardStyles.content.actionTitle}>System Modules</h3>
          
          <div className={dashboardStyles.content.grid}>
            {actions.map((action, index) => {
               if (!isAuthenticated && !action.guestAllowed) return null;

              return (
                <Link
                  key={index}
                  href={action.href!}
                  className={dashboardStyles.card.base(action.color)}
                >
                  <CardContent icon={action.icon} label={action.label} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-center text-3xl text-white uppercase tracking-[0.2em] mb-8 font-grotesk font-bold my-10">REPORT</h3>
      </div>
      
      <div className="w-full mb-10">
             <InventoryMatrixTable />
      </div>

      <footer className={dashboardStyles.footer}>
        <p>© 2024 Last Management System. All systems operational.</p>
      </footer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Modal này ở Dashboard có thể bỏ hoặc giữ nếu muốn tạo nhanh Size từ Dashboard,
          nhưng logic đã phức tạp hơn nên tốt nhất vào trang Last Sizes */}
      {/* <LastSizeModal ... /> */}
    </main>
  );
}