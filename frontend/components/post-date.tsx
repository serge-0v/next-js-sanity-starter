"use client";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

export default function PostDate({ date }: { date: string }) {
  const [postDate, setPostDate] = useState<string>("");

  useEffect(() => {
    if (date) {
      const formattedDate = formatDate(date);
      setPostDate(formattedDate);
    }
  }, [date]);

  return <div>{postDate}</div>;
}
