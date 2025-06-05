import { useCallback, useState } from "react";

export default function useFetch<T>(url: string, options?: { delay?: number }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Add optional delay if specified
      if (options?.delay) {
        await new Promise((resolve) => setTimeout(resolve, options.delay));
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, options?.delay]);

  return { data, loading, error, fetchData };
}
