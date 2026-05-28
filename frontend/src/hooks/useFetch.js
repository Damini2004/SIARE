// src/hooks/useFetch.js
// Generic hook for fetching data from the backend with loading/error states
import { useState, useEffect, useCallback } from "react";

/**
 * @param {Function} fetchFn - async function that returns data
 * @param {Array} deps - dependency array to re-trigger fetch
 * @param {boolean} immediate - whether to fetch on mount (default true)
 */
export default function useFetch(fetchFn, deps = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) execute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
