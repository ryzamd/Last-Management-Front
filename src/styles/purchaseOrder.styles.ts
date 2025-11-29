export const purchaseOrderStyles = {
  pageWrapper: "min-h-screen p-6 md:p-10 flex flex-col items-center animate-in fade-in duration-500",
  formContainer: "w-full max-w-5xl bg-space-900 border border-space-800 rounded-xl shadow-2xl overflow-hidden flex flex-col",

  header: {
    wrapper: "p-8 border-b border-space-800 bg-space-950/50 flex flex-col gap-2",
    title: "text-2xl md:text-3xl font-phudu font-bold text-white tracking-wide uppercase",
    subtitle: "text-space-500 font-mono text-sm",
  },

  body: "p-8 space-y-10",

  section: {
    wrapper: "space-y-5",
    headerWrapper: "flex items-center gap-3 pb-2 border-b border-space-800",
    icon: "text-emerald-500 text-lg",
    title: "text-lg font-grotesk font-bold text-white uppercase tracking-wider",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  },

   inputGroup: {
    wrapper: "space-y-2",
    label: "block text-xs font-bold text-space-500 uppercase tracking-wider",
    input: "w-full h-11 bg-space-950 border border-space-700 rounded-lg px-4 text-black font-mono text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none placeholder-space-700",
    select: "w-full h-11 bg-space-950 border border-space-700 rounded-lg px-4 text-black font-mono text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none appearance-none cursor-pointer",
    readonly: "cursor-not-allowed text-space-400 border-space-800",
    error: "text-red-400 text-xs font-mono mt-1",
  },

  itemsEditor: {
    container: "space-y-4",
    inputRow: "grid grid-cols-12 gap-4 items-end bg-space-800/30 p-4 rounded-lg border border-space-800 border-dashed",
    colName: "col-span-12 md:col-span-5",
    colSize: "col-span-6 md:col-span-3",
    colQty: "col-span-6 md:col-span-2",
    colBtn: "col-span-12 md:col-span-2",
    addBtn: "w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide",
  },

  itemsTable: {
    wrapper: "w-full overflow-hidden rounded-lg border border-space-800 bg-space-950",
    table: "w-full text-left text-sm",
    thead: "bg-space-900 text-space-500 font-bold uppercase text-xs tracking-wider border-b border-space-800",
    th: "px-6 py-4",
    thRight: "px-6 py-4 text-right",
    tbody: "divide-y divide-space-800",
    tr: "group hover:bg-space-800/50 transition-colors",
    td: "px-6 py-4 font-mono text-space-300",
    tdHighlight: "px-6 py-4 font-mono text-white font-bold",
    tdRight: "px-6 py-4 font-mono text-right",
    
    empty: "p-8 text-center text-space-600 font-mono italic",
    removeBtn: "p-2 text-space-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all",
  },

  addItemRow: {
    container: "grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl items-end",
    colName: "md:col-span-5",
    colSize: "md:col-span-3",
    colQty: "md:col-span-2",
    colBtn: "md:col-span-2",
    addBtn: "w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold font-grotesk transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
  },

  footer: {
    wrapper: "p-6 bg-space-950 border-t border-space-800 flex justify-end gap-4",
    cancelBtn: "px-6 py-3 rounded-lg border border-space-700 text-space-400 hover:text-white hover:bg-space-800 font-bold text-sm transition-all uppercase tracking-wide",
    submitBtn: (isLoading: boolean) => `
      px-8 py-3 rounded-lg font-bold text-sm tracking-wide uppercase transition-all shadow-lg
      ${isLoading
        ? "bg-space-700 text-space-400 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20"
      }
    `
  },

  // --- STYLES FOR VIEW ORDERS ---
  listPageWrapper: "p-6 md:p-10 space-y-6 animate-in fade-in duration-500 min-h-screen",
  
  tableContainer: {
    wrapper: "w-full overflow-hidden rounded-2xl border border-space-800 bg-space-900 shadow-2xl",
    table: "w-full text-left border-collapse",
    thead: "bg-space-950 text-space-400 font-grotesk text-xs font-bold uppercase tracking-wider border-b border-space-800",
    th: "px-6 py-5",
    tbody: "divide-y divide-space-800/50",
    tr: "group hover:bg-space-800/30 transition-colors cursor-pointer",
    td: "px-6 py-5 text-sm font-mono text-space-300 group-hover:text-white transition-colors",
    tdBold: "px-6 py-5 text-sm font-mono font-bold text-white group-hover:text-emerald-400 transition-colors",
    statusBadge: (status: string) => {
        switch(status) {
            case 'Confirmed': return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-xs font-bold uppercase";
            case 'Denied': return "bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-xs font-bold uppercase";
            default: return "bg-orange-800/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded text-xs font-bold uppercase";
        }
    },
    actionBtn: "p-2 rounded-lg text-space-400 hover:text-white hover:bg-space-700 transition-all"
  },

  detailModal: {
    overlay: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in",
    container: "relative w-full max-w-3xl bg-space-900 rounded-2xl border border-space-700 shadow-2xl flex flex-col max-h-[90vh]",
    header: "flex items-center justify-between p-6 border-b border-space-800 bg-space-950 rounded-t-2xl",
    title: "text-xl font-phudu font-bold text-white flex items-center gap-3",
    statusTag: "ml-3 text-xs font-mono px-2 py-1 rounded border",
    
    content: "p-6 overflow-y-auto custom-scrollbar space-y-6 bg-space-900",
    
    infoGrid: "grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-space-800/30 rounded-xl border border-space-800",
    infoItem: "space-y-1",
    infoLabel: "text-xs font-bold text-space-500 uppercase",
    infoValue: "text-sm font-mono text-white",

    itemsTable: "w-full text-left text-sm mt-2",
    itemsThead: "bg-space-950 text-space-500 text-xs font-bold uppercase border-b border-space-800",
    itemsTh: "px-4 py-3",
    itemsTd: "px-4 py-3 text-space-300 font-mono border-b border-space-800/50",

    footer: "p-6 border-t border-space-800 bg-space-950 rounded-b-2xl flex justify-end gap-3",
    btnSecondary: "px-4 py-2 rounded-lg border border-space-600 text-space-300 hover:text-white hover:bg-space-800 font-bold text-sm transition-all",
    btnPrimary: "px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20",
    btnDanger: "px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-500/20",
  },

  // --- STYLES FOR ACTION MODAL ---
  actionModal: {
    overlay: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95",
    container: "relative w-full max-w-md bg-space-900 rounded-xl border border-space-700 shadow-2xl p-6 space-y-6",
    
    iconBox: (type: 'confirm' | 'deny') => `mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
        type === 'confirm' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
    } border`,
    
    title: "text-xl font-phudu font-bold text-white text-center",
    message: "text-sm font-mono text-space-300 text-center leading-relaxed",
    
    textarea: "w-full h-24 bg-space-950 border border-space-700 rounded-lg p-3 text-black font-mono text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none resize-none placeholder-space-600",
    
    actions: "grid grid-cols-2 gap-3 pt-2",
    btnCancel: "px-4 py-2.5 rounded-lg border border-space-600 text-space-300 hover:text-white hover:bg-space-800 font-bold text-sm transition-all",
    btnConfirm: "px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20",
    btnDeny: "px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-500/20",
  }
};