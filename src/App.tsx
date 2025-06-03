import useFetch from "./hooks/useFetch";
import type { Skip } from "./lib/utils";
import { SKIP_API_URL } from "./lib/consts";

function App() {
  const { data, loading, error, fetchData } = useFetch<Skip[]>(SKIP_API_URL);

  return (
    <>
      <div className="card">
        <button onClick={fetchData} className="ml-4" disabled={loading}>
          {loading ? "Loading..." : "Fetch Skip Data"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {data && (
          <div className="mt-4">
            <h3 className="font-bold">Skip Data:</h3>
            <pre className="mt-2 bg-gray-100 p-2 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
