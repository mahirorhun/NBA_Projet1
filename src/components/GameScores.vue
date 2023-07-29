<template>
    <div>
        <h3 class="text-center mt-5">{{ $route.query.codeVisitors }} / {{ $route.query.codeHome }} Details</h3>
            <p class="text-center">Game ID : {{ $route.params.id }}</p>
            <h4 class="text-center">{{ formatDate(gameDetail[0]?.game?.date.start) }}</h4>
            <ul class="list-group">
                <li class="list-group-item text-center pt-4 pb-2" v-for="item in gameDetail">
                    <h5>ARENA : {{item.game.arena.name}} ({{ item.game.arena.city }} / {{ item.game.arena.country }})</h5>
                    <hr>
                    <p>Officials : {{ item.game.officials[0] }}, {{ item.game.officials[1] }}, {{ item.game.officials[2] }}</p>
                    <hr>
                Away : <img id="logo" :src="item.game.teams.visitors.logo" :alt="item.game.teams.visitors.code">
                 {{ item.game.teams.visitors.name }} : {{ item.game.scores.visitors.points }} - {{ item.game.scores.home.points }} : {{ item.game.teams.home.name }} 
                 <img id="logo" :src="item.game.teams.home.logo" :alt="item.game.teams.home.code"> : Home
                 <hr>
                 <p v-for="i in numbers" :key="i">{{ i+1 }}.Period : {{ item.game.scores.visitors?.linescore[i]}} - {{ item.game.scores.home?.linescore[i]}}</p>
                 <br>
                </li>
            </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props:['id','codeVisitors','codeHome'],
    data(){
        return {
            gameDetail:[],
            numbers: [0, 1, 2, 3],
        }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return ""; // Tarih yoksa boş string döndür
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    async created(){
        const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games',
        params: {
            id: this.$route.params.id,
        },
        headers: {
            'X-RapidAPI-Key': 'cfcfc30db1msh406ac436e949a0cp14c5bfjsn0fa2859d3766',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            let value = response.data.response;
          for (let key in value) {
            this.gameDetail.push({ id: key, game: value[key] });
          }
        } catch (error) {
            console.error(error);
        };
        
      }

}

</script>

<style>
#logo{
    width: 50px;
    height: 50px;
}

</style>