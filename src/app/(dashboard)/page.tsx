"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserAstronaut, FaRocket, FaBoxOpen, FaUsers, FaSitemap, FaRightFromBracket, FaFileInvoiceDollar, FaTags, FaLocationArrow, FaRulerCombined, FaBuilding } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import LoginModal from "@/components/features/auth/LoginModal";
import { dashboardStyles } from "@/styles/dashboard.styles";
import { useLastSizes } from "@/hooks/useLastSizes";
import LastSizeModal from "@/components/features/lastSizes/LastSizeModal";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const {
    modalMode, setModalMode,
    selectedItem,
    sizeOptions,
    handleSubmit: handleSizeSubmit
  } = useLastSizes();

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
      guestAllowed: false,
      color: "bg-emerald-500/20 hover:bg-emerald-500/40 border-emerald-500/50",
    },
    {
      label: "Customers",
      icon: FaUsers,
      href: "/customers",
      guestAllowed: false,
      color: "bg-orange-500/20 hover:bg-orange-500/40 border-orange-500/50",
    },
    {
      label: "Locations",
      icon: FaLocationArrow,
      href: "/locations",
      guestAllowed: false,
      color: "bg-pink-500/20 hover:bg-pink-500/40 border-pink-500/50",
    },
    {
      label: "Last Names",
      icon: FaTags,
      href: "/last-names",
      guestAllowed: false,
      color: "bg-cyan-500/20 hover:bg-cyan-500/40 border-cyan-500/50",
    },
    {
      label: "Last Sizes",
      icon: FaRulerCombined,
      href: "/last-sizes",
      guestAllowed: false,
      color: "bg-fuchsia-500/20 hover:bg-fuchsia-500/40 border-fuchsia-500/50",
    },
    {
      label: "Departments",
      icon: FaBuilding,
      href: "/departments",
      guestAllowed: false,
      color: "bg-emerald-500/20 hover:bg-emerald-500/40 border-emerald-500/50",
    },
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

      {/* Main Content */}
      <div className={dashboardStyles.content.container}>
        <div className={dashboardStyles.content.welcomeSection}>
          <h2 className={dashboardStyles.content.welcomeTitle}>Welcome Manager</h2>
          <p className={dashboardStyles.content.subTitle}>Space Theme Management Dashboard</p>
          <div className={dashboardStyles.content.divider} />
        </div>

        <div className="w-full">
          <h3 className={dashboardStyles.content.actionTitle}>What do you want to do?</h3>
          
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

      <footer className={dashboardStyles.footer}>
        <p>© 2024 Last Management System. All systems operational.</p>
      </footer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <LastSizeModal
        mode={modalMode}
        item={selectedItem}
        sizeOptions={sizeOptions}
        onClose={() => setModalMode(null)}
        onSubmit={handleSizeSubmit}
      />
    </main>
  );
}