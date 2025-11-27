export const dashboardStyles = {
  main: "relative min-h-screen flex flex-col p-6 md:p-12 overflow-hidden",
  
  bgDecor: {
    top: "absolute top-0 left-0 w-96 h-96 bg-space-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2",
    bottom: "absolute bottom-0 right-0 w-[500px] h-[500px] bg-space-800/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3",
  },

  header: {
    container: "relative z-10 flex justify-between items-center mb-16",
    logoWrapper: "flex items-center gap-4",
    logoIconBox: "w-12 h-12 rounded-xl bg-gradient-to-br from-space-300 to-space-500 flex items-center justify-center shadow-lg shadow-space-500/20",
    logoIcon: "text-space-900 text-2xl",
    brandName: "text-2xl font-phudu font-bold tracking-wider text-white", // Phudu for Title
    
    userSection: "flex items-center gap-4",
    welcomeText: "hidden md:block text-space-300 font-mono", // Mono for Text
    username: "font-bold text-white font-grotesk", // Grotesk for highlight/header-like text
    
    logoutBtn: "flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/50 text-red-300 hover:bg-red-500/10 transition-colors font-mono text-sm",
    loginBtn: "group flex items-center gap-2 px-6 py-2.5 rounded-full bg-space-800/80 border border-space-500 text-space-300 hover:text-white hover:border-space-300 transition-all shadow-lg hover:shadow-space-500/20 font-grotesk font-bold",
  },

  content: {
    container: "relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full",
    welcomeSection: "text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700",
    welcomeTitle: "text-5xl md:text-7xl font-phudu font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-300 via-white to-space-300 pb-2", // Phudu
    subTitle: "text-xl md:text-2xl text-space-300/80 font-mono font-light", // Mono
    divider: "h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-space-500 to-transparent",
    
    actionTitle: "text-center text-lg text-space-500 uppercase tracking-widest mb-8 font-grotesk font-bold", // Grotesk
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  },

  card: {
    base: (color: string, isGuest: boolean) =>
      `group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${color} ${!isGuest ? "lg:col-span-2 aspect-[2/1]" : ""}`,
    inner: "flex flex-col h-full justify-between gap-4",
    iconBox: "p-3 w-fit rounded-lg bg-space-900/50 text-white group-hover:scale-110 transition-transform",
    title: "text-xl font-grotesk font-bold text-white mb-1 group-hover:text-space-300 transition-colors", // Grotesk
    desc: "text-sm text-space-300/70 font-mono", // Mono
  },

  footer: "relative z-10 mt-12 text-center text-space-500 text-sm font-mono"
};