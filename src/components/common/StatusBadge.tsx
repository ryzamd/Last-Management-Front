import clsx from "clsx";

export default function StatusBadge({ status }: { status: string }) {
  const styles = status === 'Active'
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : "bg-red-500/10 text-red-400 border-red-500/20";

  return (
    <span className={clsx("px-2 py-1 rounded border text-xs font-mono font-bold uppercase", styles)}>
      {status}
    </span>
  );
}