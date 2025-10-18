import { FormEvent, useState } from "react";

interface IndividualSearchFormProps {
  onSearch: (serial: string) => void;
  isLoading?: boolean;
}

export function IndividualSearchForm({ onSearch, isLoading }: IndividualSearchFormProps) {
  const [serial, setSerial] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serial.trim()) {
      return;
    }

    onSearch(serial.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="serial" className="block text-sm font-medium text-slate-600">
          Serial number
        </label>
        <input
          id="serial"
          name="serial"
          value={serial}
          onChange={(event) => setSerial(event.target.value)}
          placeholder="e.g. SN-001235"
          className="input mt-1"
          autoComplete="off"
        />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary px-4 py-2" disabled={isLoading}>
          {isLoading ? "Searching…" : "Search"}
        </button>
        <p className="text-sm text-slate-500">
          Scan or paste a serial number to view the device record instantly.
        </p>
      </div>
    </form>
  );
}
