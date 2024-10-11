<template>
    <div v-if="movie" class="movie-detail">
      <h1>{{ movie.Title }} ({{ movie.Year }})</h1>
      <img :src="movie.Poster" alt="movie.Title" />
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Plot:</strong> {{ movie.Plot }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '@/stores/movies'; // Assurez-vous d'importer le bon store
const route = useRoute();
const movie = ref(null);
const store = useMoviesStore();
const isFavorite = computed(() => {
  return store.favorites.some(fav => fav.imdbID === movie.value?.imdbID); // Vérifier si le film est favori
});
const toggleFavorite = () => {
  store.toggleFavorite(movie.value); // Appelle la méthode dans le store
};
onMounted(async () => {
  const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${route.params.id}`;
  const response = await fetch(url);
  const data = await response.json();
  movie.value = data;
});
  </script>
  
  <style scoped>
  .movie-detail {
    text-align: center;
  }
  </style>