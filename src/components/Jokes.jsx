import { useEffect, useState } from "react";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomjokes",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setJokes(data?.data?.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchJokes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-yellow-50">
        <div className="rounded-xl bg-white px-6 py-4 shadow-md">
          <p className="text-xl font-medium animate-pulse">
            😂 Loading jokes...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-yellow-50">
        <div className="mx-auto max-w-md rounded-xl bg-red-100 p-4 text-red-700">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-yellow-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-gray-900">
            Random Joke Collection
          </h1>

          <p className="text-lg text-gray-600">
            Fresh jokes to make your day a little brighter 😂
          </p>

          <div className="mt-6 inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-700">
            {jokes.length} Jokes Available
          </div>
        </div>

        {/* Joke Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jokes.map((joke, index) => (
            <div
              key={joke.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Top Banner */}
              <div className="flex h-32 items-center justify-center bg-linear-to-r from-orange-400 to-yellow-400">
                <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                  {["🤣", "😂", "😆", "😹", "🤪", "😜"][index % 6]}
                </span>
              </div>

              {/* Content */}
              <div className="flex h-62.5 flex-col p-6">
                <p className="flex-1 text-lg leading-relaxed text-gray-800">
                  {joke.content}
                </p>

                {/* Categories */}
                {joke.categories?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {joke.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {joke.type}
                  </span>

                  <span className="text-xl">😂</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jokes;
