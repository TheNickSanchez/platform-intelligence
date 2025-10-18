import { useMemo, useState } from "react";
import { BatchSearchForm } from "@/components/BatchSearchForm";
import { EmptyState } from "@/components/EmptyState";
import { IndividualSearchForm } from "@/components/IndividualSearchForm";
import { MissingSerialsList } from "@/components/MissingSerialsList";
import { SearchModeToggle } from "@/components/SearchModeToggle";
import { SearchResultTable } from "@/components/SearchResultTable";
import { SearchSummary } from "@/components/SearchSummary";
import { useDeviceSearch } from "@/hooks/useDeviceSearch";
import "./index.css";

function App() {
  const [mode, setMode] = useState<"individual" | "batch">("individual");
  const { results, missing, scannedCount, runSerialSearch, runBatchSearch, timestamp, inventorySize, reset } =
    useDeviceSearch();

  const hasResults = results.length > 0 || missing.length > 0;

  const headerSubtitle = useMemo(() => {
    if (mode === "batch") {
      return "Process CSV exports from your MDM or asset platform to reconcile inventory in seconds.";
    }
    return "Instantly diagnose a single device by scanning or pasting its serial number.";
  }, [mode]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10 space-y-4 text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
          Platform Intelligence
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Asset Lookup
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Unified device search</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600">{headerSubtitle}</p>
        <div className="flex justify-center">
          <SearchModeToggle mode={mode} onChange={(nextMode) => {
            setMode(nextMode);
            reset();
          }} />
        </div>
      </header>

      <main className="space-y-8">
        <section className="card">
          <div className="card-header">
            <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="card-title">{mode === "batch" ? "Batch search" : "Serial number search"}</h2>
                <p className="text-sm text-slate-500">
                  {mode === "batch"
                    ? "Paste or upload a list of serials to identify which assets match the inventory."
                    : "Look up a single serial number to check health, assignment, and last seen status."}
                </p>
              </div>
              <button type="button" className="btn-secondary px-4 py-2" onClick={reset}>
                Clear results
              </button>
            </div>
          </div>
          <div className="card-content">
            {mode === "batch" ? (
              <BatchSearchForm onSearch={runBatchSearch} inventorySize={inventorySize} />
            ) : (
              <IndividualSearchForm onSearch={runSerialSearch} />
            )}
          </div>
        </section>

        {hasResults ? (
          <section className="space-y-6">
            <SearchSummary
              mode={mode}
              scannedCount={scannedCount}
              matches={results.length}
              missing={missing.length}
              timestamp={timestamp}
            />
            <SearchResultTable results={results} />
            <MissingSerialsList serials={missing} />
          </section>
        ) : (
          <EmptyState mode={mode} inventorySize={inventorySize} />
        )}
      </main>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
        <p>Platform Intelligence · Unified Lookup Experience · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
