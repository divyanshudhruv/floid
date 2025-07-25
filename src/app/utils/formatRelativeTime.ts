
// Utils
const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}min`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}hr`;
  return `${Math.floor(diffInMinutes / 1440)}d`;
};
export { formatRelativeTime };