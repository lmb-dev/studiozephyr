export async function fetchSettings(): Promise<Settings | null> {
  try {
    const response = await fetch("/api/kvJson");

    if (!response.ok) {
      console.error("Failed to fetch settings:", response.statusText);
      return null;
    }

    const result = await response.json();
    return result.settings as Settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
