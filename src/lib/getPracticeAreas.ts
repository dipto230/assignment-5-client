export const getPracticeAreas = async () => {
  try {
    const res = await fetch("https://assignment-5-backend-sepia.vercel.app/api/v1/practiceArea", {
      cache: "no-store", // important for fresh data
    });

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error("Failed to fetch practice areas:", error);
    return [];
  }
};