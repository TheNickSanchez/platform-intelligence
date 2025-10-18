import { format } from "date-fns";

interface SearchSummaryProps {
  mode: "individual" | "batch";
  scannedCount: number;
  matches: number;
  missing: number;
  timestamp: string | null;
}

export function SearchSummary({ mode, scannedCount, matches, missing, timestamp }: SearchSummaryProps) {
  if (!timestamp) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryTile
        title="Search type"
        highlight={mode === "batch" ? "Batch lookup" : "Individual lookup"}
        description={mode === "batch" ? "Processed multiple serials in a single action." : "Single asset lookup with instant feedback."}
      />
      <SummaryTile
        title="Serials scanned"
        highlight={String(scannedCount)}
        description="Unique serial numbers processed in this search."
      />
      <SummaryTile
        title="Matches found"
        highlight={String(matches)}
        description="Assets successfully matched to inventory records."
        accent={matches > 0 ? "success" : undefined}
      />
      <SummaryTile
        title="Missing serials"
        highlight={String(missing)}
        description="Serial numbers that require follow-up investigation."
        accent={missing > 0 ? "warning" : "success"}
      />
      <SummaryTile
        title="Completed"
        highlight={format(new Date(timestamp), "PPpp")}
        description="Timestamp of the latest search run."
      />
    </div>
  );
}

interface SummaryTileProps {
  title: string;
  highlight: string;
  description: string;
  accent?: "success" | "warning" | undefined;
}

function SummaryTile({ title, highlight, description, accent }: SummaryTileProps) {
  const accentClass = {
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
  }[accent ?? ""];

  return (
    <div className="card">
      <div className="card-content space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
        <p className="text-2xl font-semibold text-slate-900">{highlight}</p>
        <p className="text-sm text-slate-600">{description}</p>
        {accentClass ? <span className={`badge ${accentClass}`}>{accent === "success" ? "On track" : "Action needed"}</span> : null}
      </div>
    </div>
  );
}
