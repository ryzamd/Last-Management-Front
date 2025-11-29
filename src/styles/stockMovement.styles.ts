export const stockMovementStyles = {
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
  },

  table: {
    container: "w-[80%] overflow-hidden rounded-xl border border-space-800 bg-space-900/40 backdrop-blur-sm shadow-2xl mx-auto",
    wrapper: "overflow-x-auto",
    element: "w-full text-left border-collapse table-fixed",
    thead: "bg-space-800/80 text-space-300 font-grotesk text-xs uppercase tracking-wider",
    
    thDate: "px-6 py-4 font-bold w-[15%]",
    thType: "px-6 py-4 font-bold w-[15%]",
    thItem: "px-6 py-4 font-bold w-[25%]",
    thQty: "px-6 py-4 font-bold w-[10%] text-right",
    thLocation: "px-6 py-4 font-bold w-[20%]",
    thUser: "px-6 py-4 font-bold w-[10%]",
    thAction: "px-6 py-4 font-bold w-[5%] text-right",

    tbody: "divide-y divide-space-800/50",
    tr: "hover:bg-space-800/30 transition-colors group cursor-pointer",
    td: "px-6 py-4 text-sm font-mono text-space-300 group-hover:text-white transition-colors truncate",
    tdDate: "px-6 py-4 text-xs font-mono text-space-400 group-hover:text-space-200",
    tdNumber: "px-6 py-4 text-sm font-mono font-bold text-right",
    
    empty: "text-center py-12 text-space-500 font-mono italic",
    
    badge: (type: string) => {
        const base = "px-2 py-1 rounded text-xs font-bold uppercase border";
        switch(type) {
            case 'Purchase': return `${base} bg-emerald-500/10 text-emerald-400 border-emerald-500/20`;
            case 'Damage': return `${base} bg-red-500/10 text-red-400 border-red-500/20`;
            case 'Adjustment': return `${base} bg-blue-500/10 text-blue-400 border-blue-500/20`;
            case 'Transfer': return `${base} bg-purple-500/10 text-purple-400 border-purple-500/20`;
            default: return `${base} bg-space-500/10 text-space-300 border-space-500/20`;
        }
    },
    actionBtn: "p-2 rounded-lg text-space-400 hover:text-white hover:bg-space-700 transition-all"
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
    container: "relative w-full max-w-2xl bg-space-900 rounded-2xl border border-space-700 shadow-2xl flex flex-col max-h-[90vh]",
    header: "flex items-center justify-between p-6 border-b border-space-800 bg-space-950 rounded-t-2xl",
    title: "text-xl font-phudu font-bold text-white flex items-center gap-3",
    
    content: "p-6 overflow-y-auto custom-scrollbar space-y-6 bg-space-900",
    
    infoGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    infoGroup: "space-y-4 p-4 bg-space-800/20 rounded-xl border border-space-800",
    groupTitle: "text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 border-b border-emerald-500/20 pb-1",
    
    infoItem: "flex flex-col gap-1",
    label: "text-xs font-bold text-space-500 uppercase",
    value: "text-sm font-mono text-white break-all",
    valueQuantity: "text-sm font-mono text-emerald-500 break-all",
    valueHighlight: "text-sm font-mono font-bold text-emerald-400",

    footer: "p-6 border-t border-space-800 bg-space-950 rounded-b-2xl flex justify-end",
    btnClose: "px-6 py-2 rounded-lg border border-space-600 text-space-300 hover:text-white hover:bg-space-800 font-bold text-sm transition-all",
  }
};