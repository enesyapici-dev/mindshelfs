const API_KEY = "7b6a9e51b8f943d3196812134999bf54";
const BASE_URL = "https://api.themoviedb.org/3";

//TMDB
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

//Open-Library API
const BASE_URL_OL = "https://openlibrary.org";

export const getPopularBooks = async () => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=20"
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const searchBooks = async (query) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=20`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
