<template>
  <div class="container mx-auto mt-8 text-center">
    <h1 class="text-4xl font-bold mb-6 text-gray-800">OMDB Movies Search</h1>
    <SearchForm v-model="isLoading" @update:model-value="loadingState" />
    <!-- Affichage du loader pendant le chargement -->
    <div v-if="isLoading" class="flex justify-center items-center mt-16">
      <span class="loader"></span>
    </div>
    
    <!-- Contenu des films si les films sont chargés -->
    <div v-else-if="movies.length">
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        <li v-for="movie in movies" :key="movie.imdbID" class="bg-white rounded-lg shadow-lg hover:bg-green-300 transition-all m-3">
          <RouterLink :to="`/movie/${movie.imdbID}`" class="text-lg py-3 block font-medium text-blue-600">
            <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'default-poster.jpg'" :alt="movie.Title" class="w-full h-64 object-contain rounded-t-lg" />
            <p class="mt-2">{{ movie.Title }} ({{ movie.Year }})</p>
          </RouterLink>
          <button @click="toggleFavorite(movie)" 
                  :class="{'bg-yellow-500': isFavorite(movie), 'bg-gray-300': !isFavorite(movie)}"
                  class="w-full py-2 mt-2 text-white rounded">
            {{ isFavorite(movie) ? 'Retirer des Favoris' : 'Ajouter aux Favoris' }}
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="text-gray-500 text-lg mt-6">Aucun film trouvé</div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useMoviesStore } from '@/stores/movies';
import { storeToRefs } from 'pinia';
import SearchForm from '@/components/SearchForm.vue';
const isLoading = ref(false);
const store = useMoviesStore();
const { movies, fetchMovies, favorites } = storeToRefs(store);
const loadingState = (value) => isLoading.value = value;
// Fonction pour ajouter/enlever des favoris
const toggleFavorite = (movie) => {
  store.toggleFavorite(movie);
};
// Vérifier si un film est un favori
const isFavorite = (movie) => {
  return store.favorites.some(fav => fav.imdbID === movie.imdbID);
};
watch(store.currentPage, (newPage) => {
  fetchMovies({ s: '', type: '' });
});
</script>
<style scoped>
/* Ajoutez votre style ici si nécessaire */
</style>