<template>
    <div class="search-form">
      <input
        v-model="search.s"
        class="border p-2 rounded mb-4"
        placeholder="Rechercher un film ou une série"
      />
      <select v-model="search.type" class="border p-2 rounded mb-4">
        <option value="">Tous</option>
        <option value="movie">Films</option>
        <option value="series">Séries</option>
      </select>
      <select v-model="search.y" class="border p-2 rounded mb-4">
        <option value="">Toutes les années</option>
        <option v-for="year in yearsRange" :key="year" :value="year">{{ year }}</option>
      </select>
      <button @click="searchMovies" class="bg-green-500 text-white p-2 rounded">
        Rechercher
      </button>
      <!-- Ajouter un bouton Voir Favoris -->
      <button @click="goToFavorites" class="bg-yellow-500 text-white p-2 rounded ml-4">
        Voir Favoris
      </button>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMoviesStore } from '@/stores/movies';
  const search = ref({ s: '', type: '', y: '' });
  const yearsRange = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
  const store = useMoviesStore();
  // Rediriger vers la page des favoris
  const router = useRouter();
  const goToFavorites = () => {
    router.push('/favorites'); // Rediriger vers une nouvelle route 'favorites'
  };
  const searchMovies = () => {
    store.fetchMovies(search.value);
  };
  </script>
  <style scoped>
  .search-form {
    display: flex;
    gap: 10px;
  }
  </style>