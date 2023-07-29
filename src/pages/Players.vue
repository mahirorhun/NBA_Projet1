<template>
    <div>
      <hr>
      <h3 class="text-center">{{ }} Players</h3>
      <app-player-data></app-player-data>
      <router-view></router-view>
      <hr>

    </div>
  </template>
  
<script>
import PlayersData from '../components/PlayersData.vue';
export default {
  components:{
    appPlayerData : PlayersData,
  }
}

</script>