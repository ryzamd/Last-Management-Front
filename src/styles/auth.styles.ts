export const loginStyles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200",
  container: "relative w-full max-w-md overflow-hidden rounded-2xl border border-space-500 bg-space-900 shadow-2xl",
  
  header: {
    wrapper: "flex items-center justify-between p-6 bg-space-800/50 border-b border-space-800",
    title: "text-xl font-phudu font-bold text-white flex items-center gap-2", // Phudu
    closeBtn: "text-space-300 hover:text-white transition-colors rounded-lg p-1 hover:bg-space-800",
  },

  form: {
    wrapper: "p-6 space-y-6",
    errorBox: "p-3 text-sm font-mono text-red-200 bg-red-900/50 border border-red-500 rounded-lg animate-in slide-in-from-top-2",
    inputGroup: "space-y-4",
    
    inputWrapper: "relative group",
    inputIcon: "absolute left-3 top-3 text-space-500 group-focus-within:text-space-300 transition-colors",
    inputField: "w-full bg-space-900/50 border border-space-500 rounded-xl py-2.5 pl-10 pr-4 text-white font-mono placeholder-space-500 focus:outline-none focus:border-space-300 focus:ring-1 focus:ring-space-300 transition-all", // Mono
    
    submitBtn: (isLoading: boolean) =>
      `w-full py-3 rounded-xl font-grotesk font-bold text-space-900 transition-all ${
        isLoading 
          ? "bg-space-500 cursor-not-allowed opacity-70" 
          : "bg-gradient-to-r from-space-300 to-space-500 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-space-500/20"
      }`, // Grotesk
  }
};