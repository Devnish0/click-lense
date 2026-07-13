export default function formatRelativeDate(inputDate: Date | string | number | undefined | null): string {
  if (!inputDate) return "";
  const date = typeof inputDate === "string" || typeof inputDate === "number" ? new Date(inputDate) : inputDate;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMins / 60);

  // Check if calendar day is exactly yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  // 1. Minutes ago (< 1 hour)
  if (diffInMins < 60 && diffInMins >= 0) {
    return `${diffInMins} min ago`;
  }

  // 2. Hours ago (< 24 hours and not calendar yesterday)
  if (diffInHours < 24 && !isYesterday) {
    return `${diffInHours} hours ago`;
  }

  // 3. Calendar yesterday
  if (isYesterday) {
    return '1 day ago';
  }

  // 4. Older than yesterday (e.g., 12th July)
  const day = date.getDate();
  const month = date.toLocaleDateString('en-IN', { month: 'long' }).toLowerCase();
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${getOrdinal(day)} ${month}`;
}
