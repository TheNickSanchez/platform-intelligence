import { cn } from "@/lib/utils";

interface SearchModeToggleProps {
  mode: "individual" | "batch";
  onChange: (mode: "individual" | "batch") => void;
}

export function SearchModeToggle({ mode, onChange }: SearchModeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        className={cn(
          "px-4 py-2 text-sm font-medium transition-smooth",
          mode === "individual"
            ? "rounded-full bg-gradient-primary text-white shadow"
            : "rounded-full text-slate-500 hover:text-slate-700"
        )}
        onClick={() => onChange("individual")}
      >
        Individual
      </button>
      <button
        type="button"
        className={cn(
          "px-4 py-2 text-sm font-medium transition-smooth",
          mode === "batch"
            ? "rounded-full bg-gradient-primary text-white shadow"
            : "rounded-full text-slate-500 hover:text-slate-700"
        )}
        onClick={() => onChange("batch")}
      >
        Batch
      </button>
    </div>
  );
}
