"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CountdownProps = {
  expiresAt: Date;
};

const getRemainingSeconds = (expiresAt: Date): number =>
  Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));

const formatRemainingTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const Countdown = ({ expiresAt }: CountdownProps) => {
  const router = useRouter();
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getRemainingSeconds(expiresAt)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextRemainingSeconds = getRemainingSeconds(expiresAt);
      setRemainingSeconds(nextRemainingSeconds);

      if (nextRemainingSeconds <= 0) {
        clearInterval(intervalId);
        router.refresh();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt, router]);

  const isRunningOut = remainingSeconds <= 60;

  return (
    <p
      className={
        isRunningOut
          ? "font-serif text-2xl text-red-400"
          : "font-serif text-2xl text-brand-gold"
      }
    >
      {formatRemainingTime(remainingSeconds)}
    </p>
  );
};
