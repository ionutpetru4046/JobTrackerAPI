export const JOB_STATUSES = ["applied", "interview", "offer", "rejected"];

export const STATUS_LABELS = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export const STATUS_COLORS = {
  applied: "blue",
  interview: "yellow",
  offer: "green",
  rejected: "red",
};

export const SORT_OPTIONS = [
  { label: "Newest first", value: "-createdAt" },
  { label: "Oldest first", value: "createdAt" },
  { label: "Company (A-Z)", value: "company" },
  { label: "Company (Z-A)", value: "-company" },
];