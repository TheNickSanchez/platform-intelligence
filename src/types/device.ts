export type DeviceStatus = "healthy" | "warning" | "critical" | "unknown";

export interface DeviceRecord {
  serialNumber: string;
  assetTag: string;
  model: string;
  location: string;
  assignedTo: string;
  status: DeviceStatus;
  lastSeen: string;
  issues?: string[];
}

export interface SearchResult {
  device: DeviceRecord;
  note?: string;
}
