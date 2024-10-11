<template>
    <div class="flex justify-center mt-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Précédent
      </button>
      <span class="mx-2 text-lg font-bold">Page {{ currentPage }} sur {{ pages.length }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === pages.length"
        class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Suivant
      </button>
    </div>
  </template>
  <script setup>
  import { defineProps } from 'vue';
  // Propriétés reçues du parent
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    pages: {
      type: Array,
      required: true
    }
  });
  // Méthode pour changer de page
  const changePage = (page) => {
    if (page >= 1 && page <= props.pages.length) {
      // Émettre un événement avec le numéro de page
      emit('page-changed', page);
    }
  };
  </script>
  <style scoped>
  button:disabled {
    background-color: #ccc; /* Couleur grise pour les boutons désactivés */
    cursor: not-allowed; /* Changer le curseur */
  }
  </style>