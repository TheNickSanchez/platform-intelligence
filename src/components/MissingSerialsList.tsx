interface MissingSerialsListProps {
  serials: string[];
}

export function MissingSerialsList({ serials }: MissingSerialsListProps) {
  if (serials.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title text-rose-600">Not found in inventory ({serials.length})</h3>
      </div>
      <div className="card-content space-y-3">
        <p className="text-sm text-slate-600">
          These serial numbers are missing from the current asset inventory. Verify the entries or sync with your MDM system.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {serials.map((serial) => (
            <div
              key={serial}
              className="flex items-center justify-between rounded-lg border border-rose-100 bg-rose-50/80 px-3 py-2 text-sm font-medium text-rose-600"
            >
              <span className="font-mono">{serial}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
