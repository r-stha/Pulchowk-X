export type DerivedEventStatus =
  | "draft"
  | "cancelled"
  | "upcoming"
  | "ongoing"
  | "completed";

type EventLike = {
  status?: string | null;
  eventStartTime: Date | string;
  eventEndTime: Date | string;
};

function toDate(value: Date | string): Date | null {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function deriveEventStatus(event: EventLike): DerivedEventStatus {
  const raw = event.status?.toLowerCase().trim();
  if (raw === "draft") return "draft";
  if (raw === "cancelled") return "cancelled";

  const start = toDate(event.eventStartTime);
  const end = toDate(event.eventEndTime);
  if (!start || !end) return "upcoming";

  const now = new Date();
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "ongoing";
}
