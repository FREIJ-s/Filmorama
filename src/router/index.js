import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MovieDetail from '@/views/MovieDetail.vue';
import FavoritesView from '@/views/FavoritesView.vue'; // Import de la vue des favoris
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: MovieDetail,
  },
  {
    path: '/favorites', // Nouvelle route pour les favoris
    name: 'favorites',
    component: FavoritesView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;