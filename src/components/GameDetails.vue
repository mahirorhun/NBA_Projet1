<template>
        <div>
            <app-game-scores></app-game-scores>
            <app-game-statistics></app-game-statistics>
            <router-view></router-view>
        </div>
</template>

<script>
import GameStatistics from './GameStatistics.vue';
import GameScores from './GameScores.vue';
  
  export default {
    components:{
      appGameStatistics : GameStatistics,
      appGameScores : GameScores,
    },
    
  };

</script>

