import type { DeviceRecord } from "@/types/device";

export const DEVICE_INVENTORY: DeviceRecord[] = [
  {
    serialNumber: "SN-001234",
    assetTag: "AST-4521",
    model: "Dell Latitude 7440",
    location: "New York HQ",
    assignedTo: "Jordan Smith",
    status: "healthy",
    lastSeen: "2025-02-18T09:34:00Z",
  },
  {
    serialNumber: "SN-001235",
    assetTag: "AST-4522",
    model: "Dell Latitude 7440",
    location: "New York HQ",
    assignedTo: "Morgan Lee",
    status: "warning",
    lastSeen: "2025-02-16T17:12:00Z",
    issues: ["Battery health at 68%", "Disk usage at 91%"],
  },
  {
    serialNumber: "SN-001236",
    assetTag: "AST-5230",
    model: "Apple MacBook Pro 14",
    location: "San Francisco Studio",
    assignedTo: "Avery Patel",
    status: "healthy",
    lastSeen: "2025-02-19T12:05:00Z",
  },
  {
    serialNumber: "SN-001237",
    assetTag: "AST-6120",
    model: "Lenovo ThinkPad X1",
    location: "Remote - Chicago",
    assignedTo: "Jamie Rivera",
    status: "critical",
    lastSeen: "2025-02-10T08:22:00Z",
    issues: ["Offline for 9 days", "Endpoint protection disabled"],
  },
  {
    serialNumber: "SN-001238",
    assetTag: "AST-7450",
    model: "HP EliteBook 860",
    location: "Austin Lab",
    assignedTo: "Taylor Chen",
    status: "warning",
    lastSeen: "2025-02-18T15:47:00Z",
    issues: ["Fan speed anomaly detected"],
  },
];

export function searchBySerial(serial: string): DeviceRecord | undefined {
  const normalized = serial.trim().toUpperCase();
  return DEVICE_INVENTORY.find(
    (device) => device.serialNumber.toUpperCase() === normalized
  );
}
