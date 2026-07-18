export default function formatRelativeDate(inputDate: Date | string | number | undefined | null): string {
  if (!inputDate) return "";
  const date = typeof inputDate === "string" || typeof inputDate === "number" ? new Date(inputDate) : inputDate;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  // Future Date (e.g. Expiration dates)
  if (diffInMs < 0) {
    const absDiffInMs = Math.abs(diffInMs);
    const absDiffInMins = Math.floor(absDiffInMs / 60000);
    const absDiffInHours = Math.floor(absDiffInMins / 60);

    if (absDiffInMins < 1) {
      return "in a few seconds";
    }
    if (absDiffInMins < 60) {
      return `in ${absDiffInMins} min${absDiffInMins === 1 ? "" : "s"}`;
    }
    if (absDiffInHours < 24) {
      return `in ${absDiffInHours} hour${absDiffInHours === 1 ? "" : "s"}`;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.toDateString() === date.toDateString()) {
      return "tomorrow";
    }

    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return `on ${month} ${day}`;
  }

  // Past Date
  const diffInMins = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMins / 60);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (diffInMins < 60) {
    return diffInMins <= 1 ? "just now" : `${diffInMins} min ago`;
  }

  if (diffInHours < 24 && !isYesterday) {
    return `${diffInHours} hours ago`;
  }

  if (isYesterday) {
    return "1 day ago";
  }

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${day}`;
}
