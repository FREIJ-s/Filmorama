<template>
    <div class="container mx-auto mt-8 text-center">
    <h1 class="text-4xl font-bold mb-6 text-gray-800">Mes Favoris</h1>
    <div v-if="favorites.length">
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        <li v-for="movie in favorites" :key="movie.imdbID" class="bg-white rounded-lg shadow-lg hover:bg-green-300 transition-all m-3">
            <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'default-poster.jpg'" :alt="movie.Title" class="w-full h-64 object-contain rounded-t-lg" />
            <p class="mt-2">{{ movie.Title }} ({{ movie.Year }})</p>
            <button @click="removeFromFavorites(movie)" 
                    class="bg-red-500 w-full py-2 mt-2 text-white rounded">
            Retirer des Favoris
            </button>
        </li>
        </ul>
    </div>
    <div v-else class="text-gray-500 text-lg mt-6">
        Aucun film ajouté aux favoris.
    </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useMoviesStore } from '@/stores/movies';
const store = useMoviesStore();
const { favorites } = storeToRefs(store);
  // Fonction pour retirer un film des favoris
const removeFromFavorites = (movie) => {
    store.toggleFavorite(movie);
};
</script>
<style scoped>
  /* Ajoutez votre style ici si nécessaire */
</style>