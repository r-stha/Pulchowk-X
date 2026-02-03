import { parseEventDateTime } from "./event-dates";
import type { ClubEvent } from "./api";

export type DerivedEventStatus =
  | "draft"
  | "cancelled"
  | "upcoming"
  | "ongoing"
  | "completed";

export function deriveEventStatus(
  event: Pick<ClubEvent, "status" | "eventStartTime" | "eventEndTime">,
): DerivedEventStatus {
  const normalized = event.status?.toLowerCase().trim();
  if (normalized === "draft") return "draft";
  if (normalized === "cancelled") return "cancelled";

  const start = parseEventDateTime(event.eventStartTime);
  const end = parseEventDateTime(event.eventEndTime);
  const now = new Date();

  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "ongoing";
}

export const getEventStatusLabel = (
  status?: string | null,
): string => {
  const normalized = status?.toLowerCase().trim();
  if (!normalized) return "unknown";
  return normalized;
};
