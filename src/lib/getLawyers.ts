export const getLawyers = async () => {
  try {
    const res = await fetch("https://assignment-5-backend-sepia.vercel.app/api/v1/lawyers", {
      cache: "no-store",
    });

    const data = await res.json();

    return data?.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch lawyers:", error);
    return [];
  }
};