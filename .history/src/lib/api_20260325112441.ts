const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
  });

  if (!res.ok) throw new Error("API Error");

  return res.json();
}

export const api = {
  getAdmins: () => fetcher("/admin"),
  getLawyers: (query?: string) => fetcher(`/lawyer${query || ""}`),
  getPracticeAreas: () => fetcher("/practice-area"),
  getSchedules: () => fetcher("/schedule"),
  getStats: () => fetcher("/stats"),
};