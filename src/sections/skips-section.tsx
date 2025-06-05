import SkipCard from "@/components/skip-card";
import Toggle from "@/components/toggle";
import Loading from "@/components/loading";
import { useSkip } from "@/hooks/useSkip";
import { SKIP_API_URL } from "@/lib/consts";
import type { Skip } from "@/lib/utils";
import { Suspense, lazy } from "react";
import * as React from "react";

let skipsPromise: Promise<Skip[]> | null = null;
let skipsData: Skip[] | null = null;

const fetchSkips = (): Promise<Skip[]> => {
  if (!skipsPromise) {
    skipsPromise = fetch(SKIP_API_URL)
      .then((response) => response.json())
      .then((data) => {
        skipsData = data;
        return data;
      });
  }
  return skipsPromise;
};

// Function that throws promise for Suspense to catch
const readSkips = (): Skip[] => {
  if (skipsData) {
    return skipsData;
  }

  // This throws the promise, which Suspense will catch
  throw fetchSkips();
};

const LazySkipsList = lazy(async () => {
  const SkipsList = () => {
    const { viewMode, setSkips, skips } = useSkip();

    const _skips = readSkips();

    React.useEffect(() => {
      setSkips(_skips);
    }, [_skips, setSkips]);

    return (
      <div className="px-4 py-4">
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
          {skips.length === 0 && (
            <div className="text-center text-gray-500">No skips available.</div>
          )}
        </div>
      </div>
    );
  };

  return { default: SkipsList };
});

export default function SkipsSection() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Choose Your Skip Size</h2>
        <p className="text-gray-500 text-sm mt-2 text-center md:text-left md:text-base">
          Select the skip size that best suits your needs
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <Toggle />
        <LazySkipsList />
      </Suspense>
    </>
  );
}
