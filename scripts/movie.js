const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTc4MTc2NWI2ZDczMzc2MzcwZDhhNjU1NDhkYmJhOSIsIm5iZiI6MTc1MzQ3MzQ1NS4wOTQsInN1YiI6IjY4ODNlMWFmOTBjNzM3ZGFkNzE2YmIyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nsAjhf0kbiW54rAqIi4pFgTmUfxbLoCM5f5Wk1ag060";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const getDataPopularMovies = async () => {
  try {
    const response = await axiosInstance.get(
      "/movie/popular?language=en-US&page=1"
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to get popular movies");
  }
};

const getDataGenres = async () => {
  try {
    const response = await axiosInstance.get("/genre/movie/list?language=en");
    return response.data.genres;
  } catch (error) {
    throw new Error("Failed to get genres");
  }
};

const mapGenres = (genreIds, genresList) => {
  return genreIds.map(
    (id) => genresList.find((genre) => genre.id === id)?.name || "Unknown"
  );
};

(async () => {
  try {
    const [popularMovies, genresList] = await Promise.all([
      getDataPopularMovies(),
      getDataGenres(),
    ]);

    const sectionMovies = document.querySelector(".movies");

    popularMovies.forEach((movie) => {
      const genreNames = mapGenres(movie.genre_ids, genresList);
      const bgCard = document.createElement("div");
      bgCard.classList.add("bg-card");

      const bgCardContent = document.createElement("div");
      bgCardContent.classList.add("bg-card-content");
      const bgCardDetails = document.createElement("button");
      bgCardDetails.classList.add("bg-card-details");
      bgCardDetails.textContent = "Details";
      bgCardDetails.onclick = () => {
        location = "/pages/movie-details.html";
      };
      const bgCardbuyTicket = document.createElement("button");
      bgCardbuyTicket.classList.add("bg-card-buy-ticket");
      bgCardbuyTicket.textContent = "Buy Ticket";

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="image" src="${IMAGE_URL}/${movie.poster_path}" alt="${
        movie.title
      }" />
        <div class="title">${movie.title}</div>
        <div class="genres">
          ${genreNames.map((g) => `<span>${g}</span>`).join("")}
        </div>
      `;
      bgCardContent.append(bgCardDetails, bgCardbuyTicket);
      bgCard.append(bgCardContent, card);
      sectionMovies.appendChild(bgCard);
    });
  } catch (error) {
    console.error(error);
  }
})();
