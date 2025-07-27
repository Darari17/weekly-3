const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTc4MTc2NWI2ZDczMzc2MzcwZDhhNjU1NDhkYmJhOSIsIm5iZiI6MTc1MzQ3MzQ1NS4wOTQsInN1YiI6IjY4ODNlMWFmOTBjNzM3ZGFkNzE2YmIyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nsAjhf0kbiW54rAqIi4pFgTmUfxbLoCM5f5Wk1ag060";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const HERO_URL = "https://image.tmdb.org/t/p/w1280";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

const getMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data;
};

(async () => {
  try {
    const movieId = 1061474;
    const result = await getMovieDetails(movieId);
    const credits = await getMovieCredits(movieId);

    const hero = document.querySelector(".hero");
    hero.style.backgroundImage = `url(${HERO_URL}${result.backdrop_path})`;
    hero.style.backgroundSize = "cover";

    const photo = document.querySelector(".photo");
    photo.style.backgroundImage = `url(${IMAGE_URL}${result.poster_path})`;
    photo.style.backgroundSize = "cover";

    const title = document.querySelector(".title");
    title.textContent = result.original_title;

    const genres = document.querySelector(".genres");
    genres.innerHTML = "";
    result.genres.forEach((g) => {
      const span = document.createElement("span");
      span.textContent = g.name;
      genres.appendChild(span);
    });

    const date = document.querySelector(".date");
    date.textContent = result.release_date;

    const director = credits.crew.find((person) => person.job === "Director");
    if (director) {
      document.querySelector(".directed-name").textContent = director.name;
    }

    const dur = document.querySelector(".dur");
    dur.textContent = `${Math.floor(result.runtime / 60)} Hours ${
      result.runtime % 60
    } minutes`;

    const casts = credits.cast
      .slice(0, 5)
      .map((c) => c.name)
      .join(", ");
    const caster = document.querySelector(".cast-names");
    caster.textContent = casts;

    const synopsis = document.querySelector(".synopsis-text");
    synopsis.textContent = result.overview;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
})();
