import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface BatchSearchFormProps {
  onSearch: (serials: string[]) => void;
  isLoading?: boolean;
  inventorySize: number;
}

const EXAMPLE_SERIALS = ["SN-001234", "SN-001235", "SN-001240"];

export function BatchSearchForm({ onSearch, isLoading, inventorySize }: BatchSearchFormProps) {
  const [rawInput, setRawInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const derivedCount = useMemo(() => {
    return rawInput
      .split(/[\n,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean).length;
  }, [rawInput]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const serials = rawInput
      .split(/[\n,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean);

    if (serials.length === 0) {
      setError("Provide at least one serial number to search.");
      return;
    }

    onSearch(serials);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setRawInput(text);
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="serials" className="block text-sm font-medium text-slate-600">
          Serial numbers
        </label>
        <textarea
          id="serials"
          name="serials"
          value={rawInput}
          onChange={(event) => setRawInput(event.target.value)}
          placeholder={EXAMPLE_SERIALS.join("\n")}
          className="textarea"
        />
        <p className="text-xs text-slate-500">
          Paste up to {inventorySize} serials separated by commas, spaces, or line breaks. Duplicate entries are removed automatically.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary px-4 py-2" disabled={isLoading}>
          {isLoading ? "Scanning…" : "Run batch search"}
        </button>
        <label className={cn("btn-secondary cursor-pointer px-4 py-2", isLoading && "pointer-events-none opacity-60")}
        >
          Upload CSV
          <input
            type="file"
            accept=".csv,.txt"
            className="hidden"
            onChange={handleUpload}
            disabled={isLoading}
          />
        </label>
        <div className="badge">{derivedCount} serials queued</div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
