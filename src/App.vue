<template>
  <div class="flex h-full flex-col">
    <header class="text-white p-4 h-16 bg-red-800 w-full shadow-md">
      <RouterLink to="/" class="text-xl font-bold">Filmorama</RouterLink>
    </header>
    <div class="h-full flex-grow overflow-auto bg-gray-100 p-4">
      <RouterView></RouterView>
    </div>
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Chargement des résultats...</p>
      <span class="loader"></span>
    </div>
    <footer class="bg-red-800 text-white text-center p-4">
    </footer>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style>
.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  margin:15px auto;
  position: relative;
  background: #FFF;
  box-sizing: border-box;
  animation: shadowExpandX 6s linear infinite alternate;
}
@keyframes shadowExpandX {
  0% {
    box-shadow: 0 0, 0 0;
    color: rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: -24px 0, 24px 0;
    color: rgba(255, 255, 255, 0.8);
  }
}    
</style>