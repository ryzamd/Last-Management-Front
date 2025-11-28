export const inventoryStyles = {
  pageWrapper: "p-6 space-y-6 animate-in fade-in duration-500",

  navigation: {
    container: "w-[80%] flex justify-start items-center mb-4",
    link: "flex items-center gap-3 text-white/80 hover:text-white transition-all group cursor-pointer",
    iconBox: "w-10 h-10 rounded-lg bg-gradient-to-br from-space-500 to-space-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform",
    icon: "text-white text-lg",
    brandName: "text-2xl font-phudu font-bold tracking-wider",
  },

  tableHeader: {
    container: "w-[80%] flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-2 mx-auto",
    titleWrapper: "flex flex-col",
    title: "text-2xl font-phudu font-bold text-white tracking-tight",
    
    actions: "flex items-center gap-3 w-full md:w-auto",
    searchBox: "relative flex-1 md:w-64",
    searchInput: "w-full bg-space-900/50 border border-space-500 rounded-lg pl-10 pr-4 py-2 text-sm font-mono text-white placeholder-space-300/50 focus:outline-none focus:border-space-300 transition-colors",
    searchIcon: "absolute left-3 top-2.5 text-space-500",
    createBtn: "flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 rounded-lg text-white font-grotesk font-bold text-sm transition-all shadow-lg shadow-emerald-500/20",
  },

  table: {
    container: "w-[80%] overflow-hidden rounded-xl border border-space-800 bg-space-900/40 backdrop-blur-sm shadow-2xl mx-auto",
    wrapper: "overflow-x-auto",
    element: "w-full text-left border-collapse table-fixed",
    thead: "bg-space-800/80 text-space-300 font-grotesk text-xs uppercase tracking-wider",
    
    thSku: "px-6 py-4 font-bold w-[20%]",
    thName: "px-6 py-4 font-bold w-[25%]",
    thQty: "px-6 py-4 font-bold w-[10%] text-right",
    thAction: "px-6 py-4 font-bold text-right w-[15%]",

    tbody: "divide-y divide-space-800/50",
    tr: "hover:bg-space-800/30 transition-colors cursor-pointer group",
    td: "px-6 py-4 text-sm font-mono text-space-300 group-hover:text-white transition-colors truncate",
    tdNumber: "px-6 py-4 text-sm font-mono text-space-300 group-hover:text-white transition-colors truncate text-right",
    
    empty: "text-center py-12 text-space-500 font-mono italic",
    actions: "flex items-center gap-2 justify-end",
    actionBtn: (variant: 'edit' | 'delete') =>
      `p-2 rounded-lg transition-colors ${
        variant === 'edit' ? 'text-blue-400 hover:bg-blue-500/20' : 'text-red-400 hover:bg-red-500/20'
      }`,
  },

  pagination: {
    container: "w-[80%] flex justify-between items-center mt-4 text-xs font-mono text-space-300 mx-auto",
    select: "bg-space-900 border border-space-500 rounded px-2 py-1 focus:outline-none ml-2",
    nav: "flex items-center gap-2",
    pageBtn: "px-3 py-1 rounded border border-space-500 hover:bg-space-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
    info: "text-space-500",
  },

  modal: {
    overlay: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in",
    container: "relative w-full max-w-2xl bg-space-900 rounded-2xl border border-space-500 shadow-2xl flex flex-col max-h-[90vh]",
    header: "flex items-center justify-between p-6 border-b border-space-800 bg-space-800/30",
    title: "text-xl font-phudu font-bold text-white",
    content: "p-6 overflow-y-auto custom-scrollbar space-y-6",
    footer: "p-6 border-t border-space-800 flex justify-end gap-3 bg-space-800/30 rounded-b-2xl",
    
    label: "block text-xs font-grotesk font-bold text-space-500 uppercase tracking-wider mb-1",
    input: "w-full bg-space-950 border border-space-500 rounded-lg px-4 py-2.5 text-black font-mono focus:border-space-300 focus:ring-1 focus:ring-space-300 transition-all outline-none",
    
    groupContainer: "space-y-4 p-4 rounded-xl bg-space-800/20 border border-space-800",
    groupTitle: (color: 'emerald' | 'blue') => `text-sm font-grotesk font-bold ${color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'} uppercase tracking-widest`,
    
    cancelBtn: "px-4 py-2 rounded-lg border border-space-500 text-space-300 hover:bg-space-800 font-mono transition-colors",
    confirmBtn: "px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-400 text-white font-grotesk font-bold transition-colors shadow-lg shadow-space-500/20",
  },
};