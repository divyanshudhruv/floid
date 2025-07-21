import { formatDistance } from "date-fns";

export const formatShortRelativeTime = (date: Date | number): string => {
  const distance = formatDistance(date, new Date(), { includeSeconds: true });

  const match = distance.match(/(d+)/);
  const number = match ? match[0] : "";

  let unit = "";
  if (distance.includes("second")) unit = "s";
  else if (distance.includes("minute")) unit = "m";
  else if (distance.includes("hour")) unit = "h";
  else if (distance.includes("day")) unit = "d";
  else if (distance.includes("month")) unit = "mo";
  else if (distance.includes("year")) unit = "y";

  return number + unit;
};
