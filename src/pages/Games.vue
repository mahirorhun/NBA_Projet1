<template>
    <div>
      <hr>
      <h3 class="text-center">Games</h3>
      <hr>
      <app-games-data></app-games-data>
      <router-view></router-view>
      <div class="mb-5 mt-5"></div>
    </div>
  </template>
  
<script>
import GamesData from '../components/GamesData.vue';
export default {
  components:{
    appGamesData : GamesData,
  }
}

</script>