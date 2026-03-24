export const getPracticeAreas = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/practiceArea", {
      cache: "no-store", // important for fresh data
    });

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error("Failed to fetch practice areas:", error);
    return [];
  }
};