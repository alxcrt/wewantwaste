import useFetch from "./hooks/useFetch";
import type { Skip } from "./lib/utils";
import { SKIP_API_URL } from "./lib/consts";
import { useEffect } from "react";
import { useSkip } from "./hooks/useSkip";
import { Button } from "./components/ui/button";

import SkipCard from "./components/skip-card";

function App() {
  const { data, loading, error, fetchData } = useFetch<Skip[]>(SKIP_API_URL);
  const { selectedSkip, setSkips, skips, viewMode, setViewMode } = useSkip();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setSkips(data);
    }
  }, [data, setSkips]);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && <p className="text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {skips && (
          <div className="px-4 py-4">
            <Button onClick={() => setViewMode("grid")}>📋 Boring Mode</Button>
            <Button onClick={() => setViewMode("tinder")}>🔥 Spicy Mode</Button>
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                  : "grid gap-4"
              }`}
            >
              {skips.map((skip) => (
                <SkipCard key={skip.id} skip={skip} />
              ))}
            </div>
          </div>
        )}

        {selectedSkip && (
          <div className="fixed bottom-0 left-0 w-full h-24 bg-white z-50 border-2 border-gray-200">
            <div className="max-w-7xl mx-auto">
              <p>
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification, colours may vary,
                options and/or accessories may be featured at additional cost.
              </p>
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-row gap-4">
                  <p>{selectedSkip.size} Yard Skip</p>
                  <p>{selectedSkip.price_before_vat}</p>
                  <p>{selectedSkip.hire_period_days} day hire period</p>
                </div>
                <div className="flex flex-row gap-4">
                  <Button>Back</Button>
                  <Button>Continue</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
