import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import StarRating from "./components/StarRating";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useKey } from "./hooks/useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "4cbcc021";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const {movies, isLoader, error} = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");


  function handleAddWatchList(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDelete(id) {
    setWatched((watched) =>
      watched.filter((watch) => watch.imdbID !== id && watch)
    );
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoader && <Loader />}
          {!isLoader && !error && (
            <MovieList movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              handleAddWatchList={handleAddWatchList}
              watched={watched}
            />
          ) : (
            <>
              <SummaryWatched watched={watched} />
              <WatchedMovieList handleDelete={handleDelete} watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieList({ movies, setSelectedId }) {
  return (
    <ul className="list list-movies">
      <Movie movies={movies} setSelectedId={setSelectedId} />
    </ul>
  );
}

function Movie({ movies, setSelectedId }) {
  return movies?.map((movie) => (
    <li
      key={movie.imdbID}
      onClick={() =>
        setSelectedId((selectedId) =>
          selectedId === movie.imdbID ? null : movie.imdbID
        )
      }
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  ));
}

function MovieDetails({
  selectedId,
  setSelectedId,
  handleAddWatchList,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  const isWatched = watched
    .map((watched) => watched.imdbID)
    .includes(selectedId);
  const watchedUserRating = watched.find(
    (watched) => watched.imdbID === selectedId
  )?.userRating;

  const countRef = useRef(0);

  useEffect(() => {
    if(userRating) countRef.current++;
  }, [userRating]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actor,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddMovieWatch() {
    const newWatchMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
      countRatingDecision: countRef.current,
    };
    setSelectedId(null);
    handleAddWatchList(newWatchMovie);
  }


  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoader(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!response.ok) throw new Error("something went wrong");
        const data = await response.json();
        setMovie(data);
        setIsLoader(false);
      } catch (err) {
        setDetailsError(err.message);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKey("Escape", onCloseMovie);

  function onCloseMovie(){
    setSelectedId(null);
  }

  

  return (
    <div className="details">
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster image of ${poster}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    onMovieRating={setUserRating}
                    className="star"
                    size={22}
                    maxRating={10}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAddMovieWatch} className="btn-add">
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have rated this {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function SummaryWatched({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>
            {avgImdbRating ? avgImdbRating.toFixed(1) : avgImdbRating}
          </span>
        </p>
        <p>
          <span>🌟</span>
          <span>
            {avgUserRating ? avgUserRating.toFixed(1) : avgUserRating}
          </span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime ? avgRuntime.toFixed(1) : avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          handleDelete={handleDelete}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDelete }) {
  function handleDeleteMovie() {
    handleDelete(movie.imdbID);
  }
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button onClick={handleDeleteMovie} className="btn-delete">
          x
        </button>
      </div>
    </li>
  );
}

function Loader() {
  return <p className="loader">Loading data..</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="loader">
      <span>⛔</span>
      {message}
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
