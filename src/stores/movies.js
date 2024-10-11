import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
export const useMoviesStore = defineStore('movies', () => {
  
  const movies = ref([]);
  const totalResults = ref(0);
  const currentPage = ref(1);
  const apiError = ref(null);
  const favorites = ref([]); // Ajout d'un tableau pour les favoris
  // Charger les favoris depuis localStorage
  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.value = storedFavorites;
  };
  // Sauvegarder les favoris dans localStorage
  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  };
  // Fonction pour appeler l'API et récupérer les films
  const fetchMovies = async (search) => {
    const query = new URLSearchParams({
      s: search.s || '',
      type: search.type || '',
      page: currentPage.value,
      y: search.y || '',
    }).toString();
    
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=31ff437f&${query}`);
      const data = await response.json();
      if (data.Error) {
        movies.value = [];
        totalResults.value = 0;
        apiError.value = data.Error;
      } else {
        movies.value = data.Search.slice(0, 10);
        totalResults.value = parseInt(data.totalResults, 10);
        apiError.value = null;
      }
    } catch (error) {
      apiError.value = 'Erreur lors de la récupération des données';
    }
  };
  // Fonction pour ajouter ou retirer un favori
  const toggleFavorite = (movie) => {
    const index = favorites.value.findIndex(fav => fav.imdbID === movie.imdbID);
    if (index === -1) {
      favorites.value.push(movie); // Ajouter aux favoris
    } else {
      favorites.value.splice(index, 1); // Retirer des favoris
    }
    saveFavorites(); // Sauvegarder les favoris après modification
  };
  // Computed property pour gérer la pagination
  const pages = computed(() => {
    const pagesCount = Math.ceil(totalResults.value / 10);
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  });
  // Charger les favoris lors de l'initialisation
  onMounted(() => {
    loadFavorites();
  });
  return {
    movies,
    totalResults,
    currentPage,
    apiError,
    fetchMovies,
    pages,
    favorites,
    toggleFavorite // Expose la fonction pour l'utiliser dans HomeView
  };
});