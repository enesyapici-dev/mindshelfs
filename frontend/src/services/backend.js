//movies
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
export const deleteMovieFromDB = async (id) => {
  const response = await fetch(`http://localhost:5555/movies/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
export const updateMovieInDB = async (updatedMovie) => {
  const response = await fetch(
    `http://localhost:5555/movies/${updatedMovie._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    }
  );
  const data = await response.json();
  return data;
};

//books
export const getBooks = async () => {
  const response = await fetch("http://localhost:5555/books");
  const data = await response.json();
  return data.data;
};

export const addBookToDB = async (book) => {
  const response = await fetch("http://localhost:5555/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  const data = await response.json();
  return data;
};

export const deleteBookFromDB = async (id) => {
  const response = await fetch(`http://localhost:5555/books/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const updateBookInDB = async (updatedBook) => {
  const response = await fetch(
    `http://localhost:5555/books/${updatedBook._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    }
  );
  const data = await response.json();
  return data;
};
