"use client";

import { useQuery } from "@tanstack/react-query";
import { practiceService } from "@/services/practice.service";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["practice"],
    queryFn: practiceService.getAll,
  });

  return (
    <div>
      <h1>Practice Areas</h1>
      <pre>{JSON.stringify(data?.data, null, 2)}</pre>
    </div>
  );
}