interface EmptyStateProps {
  mode: "individual" | "batch";
  inventorySize: number;
}

export function EmptyState({ mode, inventorySize }: EmptyStateProps) {
  const message =
    mode === "batch"
      ? "Upload a list of serial numbers or paste them into the field to scan the inventory in seconds."
      : "Enter a serial number to retrieve diagnostics and assignment details instantly.";

  return (
    <div className="card border-dashed border-2 border-slate-300 bg-white/80 text-center shadow-none">
      <div className="card-content space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {mode === "batch" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5h12M9 3v2m6 4h6M15 9v12m6-6H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5h10M11 12h10M11 19h10M4 5h.01M4 12h.01M4 19h.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Start a {mode === "batch" ? "batch" : "single"} lookup</h3>
        <p className="text-sm text-slate-600">{message}</p>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Inventory contains {inventorySize} managed devices
        </p>
      </div>
    </div>
  );
}
