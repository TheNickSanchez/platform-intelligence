import { formatDistanceToNow } from "date-fns";
import type { SearchResult } from "@/types/device";

interface SearchResultTableProps {
  results: SearchResult[];
}

const STATUS_COLORS: Record<string, string> = {
  healthy: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  critical: "bg-rose-50 text-rose-600",
  unknown: "bg-slate-200 text-slate-600",
};

export function SearchResultTable({ results }: SearchResultTableProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Matched devices ({results.length})</h3>
      </div>
      <div className="card-content overflow-x-auto">
        <table className="table min-w-[720px]">
          <thead>
            <tr>
              <th className="w-40">Serial number</th>
              <th className="w-36">Asset tag</th>
              <th>Model</th>
              <th>Assigned to</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ device, note }) => {
              const badgeClass = STATUS_COLORS[device.status] ?? STATUS_COLORS.unknown;
              const relative = formatDistanceToNow(new Date(device.lastSeen), {
                addSuffix: true,
              });

              return (
                <tr key={device.serialNumber}>
                  <td className="font-mono text-sm font-semibold text-slate-700">
                    {device.serialNumber}
                    {note ? <p className="text-xs font-normal text-slate-500">{note}</p> : null}
                  </td>
                  <td className="font-medium text-slate-700">{device.assetTag}</td>
                  <td className="text-slate-600">{device.model}</td>
                  <td className="text-slate-600">{device.assignedTo}</td>
                  <td className="text-slate-600">{device.location}</td>
                  <td>
                    <span className={`inline-flex min-w-[88px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeClass}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="text-slate-500">{relative}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
