<template>
    <div>
        <h4 class="text-center">{{ formatDate(gameList[0]?.game?.date.start) }}</h4>
        <input type="date" v-model="selectedDate" @change="gameDates" />
        <hr>
        <ul class="list-group">
        <li class="list-group-item text-center pt-4 pb-2" v-if="gameList.length > 0" v-for="item in gameList">
            
          Away : <img id="logo" :src="item.game.teams.visitors.logo" :alt="item.game.teams.visitors.code"> {{ item.game.teams.visitors.name }} : {{ item.game.scores.visitors.points }} - {{ item.game.scores.home.points }} : {{ item.game.teams.home.name }} <img id="logo" :src="item.game.teams.home.logo" :alt="item.game.teams.home.code"> : Home <br>
          <router-link
                :to="{
                    name: 'GameDetails',
                    params: {
                    id: item.game.id,
                    },
                    query: {
                        codeVisitors : item.game.teams.visitors.code,
                        codeHome : item.game.teams.home.code
                    }
                }"><p class="pt-2">Detaylar için Tıklayın</p>
            </router-link>
        </li>
        <li class="list-group-item text-center pt-4 pb-4" v-else>Seçilen tarihte maç verisi bulunmamaktadır.</li>
      </ul>
    </div>
</template>
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        gameList: [],
        selectedDate: '2022-02-12', // Başlangıçta varsayılan tarihi belirleyin
      };
    },
    created() {
      this.gameDates(); 
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
      async gameDates() {
        this.gameList = [];
        const options = {
          method: 'GET',
          url: 'https://api-nba-v1.p.rapidapi.com/games',
          params: {
            date: this.selectedDate, 
          },
          headers: {
            'X-RapidAPI-Key': 'cfcfc30db1msh406ac436e949a0cp14c5bfjsn0fa2859d3766',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
          },
        };
  
        try {
          const response = await axios.request(options);
          let value = response.data.response;
          for (let key in value) {
            this.gameList.push({ id: key, game: value[key] });
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
    
  };
  </script>
  
  <style>
  #logo {
    width: 50px;
    height: 50px;
  }
  </style>
  