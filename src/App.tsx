import useFetch from "./hooks/useFetch";
import type { Skip } from "./lib/utils";
import { SKIP_API_URL } from "./lib/consts";
import { Card, CardBody, CardHeader, CardFooter } from "./components/card";
import { useEffect } from "react";
import { useSkip } from "./hooks/useSkip";
import { Button } from "./components/button";

function App() {
  const { data, loading, error, fetchData } = useFetch<Skip[]>(SKIP_API_URL);
  const { selectedSkip, selectSkip } = useSkip();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && <p className="text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {data && (
          <div className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
              {data.map((skip) => (
                <Card
                  key={skip.id}
                  onClick={() =>
                    selectedSkip?.id === skip.id
                      ? selectSkip(null)
                      : selectSkip(skip)
                  }
                  className={`${
                    selectedSkip?.id === skip.id
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <div className="w-full h-48 bg-gray-200">
                      <img
                        src="https://placehold.co/600x400"
                        alt="Skip"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div>{skip.size} Yard Skip</div>
                    <div>{skip.hire_period_days} day hire period</div>
                    <div>{skip.price_before_vat}</div>
                  </CardBody>
                  <CardFooter>
                    <button className="cursor-pointer border-2 border-gray-200 rounded-md px-2 py-1">
                      {selectedSkip?.id === skip.id
                        ? "Selected"
                        : "Select this skip"}
                    </button>
                  </CardFooter>
                </Card>
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
                  <p>{selectedSkip.price_before_vat} day hire period</p>
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
