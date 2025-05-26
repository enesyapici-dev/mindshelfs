export const getWatchedMovies = async () => {
  const response = await fetch("http://localhost:5555/movies");

  const data = await response.json();
  return data.data;
};
