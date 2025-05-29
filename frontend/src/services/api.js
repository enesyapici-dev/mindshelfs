const API_KEY = "7b6a9e51b8f943d3196812134999bf54";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopulerMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query==${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
  );
  const data = await response.json();
  return data;
};
