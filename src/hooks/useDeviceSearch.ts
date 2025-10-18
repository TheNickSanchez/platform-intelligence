import { useMemo, useState } from "react";
import { DEVICE_INVENTORY, searchBySerial } from "@/data/deviceInventory";
import type { DeviceRecord, SearchResult } from "@/types/device";

interface SearchState {
  query: string;
  results: SearchResult[];
  missing: string[];
  scannedCount: number;
  timestamp: string | null;
}

const emptyState: SearchState = {
  query: "",
  results: [],
  missing: [],
  scannedCount: 0,
  timestamp: null,
};

export function useDeviceSearch() {
  const [state, setState] = useState<SearchState>(emptyState);

  const inventoryIndex = useMemo(() => {
    return DEVICE_INVENTORY.reduce<Record<string, DeviceRecord>>((acc, device) => {
      acc[device.serialNumber.toUpperCase()] = device;
      return acc;
    }, {});
  }, []);

  const runSerialSearch = (serial: string) => {
    const device = searchBySerial(serial);
    setState({
      query: serial,
      results: device ? [{ device }] : [],
      missing: device ? [] : [serial],
      scannedCount: device ? 1 : 0,
      timestamp: new Date().toISOString(),
    });
  };

  const runBatchSearch = (serials: string[]) => {
    const normalized = serials
      .map((serial) => serial.trim())
      .filter(Boolean)
      .map((serial) => serial.toUpperCase());

    const unique = Array.from(new Set(normalized));

    const found: SearchResult[] = [];
    const missing: string[] = [];

    unique.forEach((serial) => {
      const device = inventoryIndex[serial];
      if (device) {
        found.push({ device });
      } else {
        missing.push(serial);
      }
    });

    setState({
      query: unique.join(", "),
      results: found,
      missing,
      scannedCount: unique.length,
      timestamp: new Date().toISOString(),
    });
  };

  const reset = () => setState(emptyState);

  return {
    ...state,
    inventorySize: DEVICE_INVENTORY.length,
    runSerialSearch,
    runBatchSearch,
    reset,
  };
}
