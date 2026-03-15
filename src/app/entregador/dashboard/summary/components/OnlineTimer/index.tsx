"use client";

import { useEffect, useState } from "react";
import { differenceInMinutes, differenceInHours } from "date-fns";

export function OnlineTimer({ startTime }: { startTime: Date }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const hours = differenceInHours(now, new Date(startTime));
  const minutes = differenceInMinutes(now, new Date(startTime)) % 60;

  return (
    <span>
      {hours}h {minutes}min
    </span>
  );
}
