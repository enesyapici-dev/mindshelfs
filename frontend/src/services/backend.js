export const getWatchedMovies = async () => {
  const response = await fetch("http://localhost:5555/movies");

  const data = await response.json();
  return data.data;
};
export const addMovieToDB = async (movie) => {
  const response = await fetch("http://localhost:5555/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  const data = await response.json();
  return data;
};
