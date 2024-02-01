import { useEffect, useState } from "react";

const KEY = "4cbcc021";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoader(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoader(false);
      }
    }

    if (query.length < 3) {
      setError("");
      setMovies([]);
      return;
    }

    // setSelectedId(null);
    fetchMovie();

    return function () {
      controller.abort();
    };
  }, [query]);

  return {movies, isLoader, error};
}
