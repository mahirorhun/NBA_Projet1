<template>
    <div>  
      <div v-for="(teamStats, teamName) in groupedGameStatistic" :key="teamName">
        <h4>{{ teamName }}</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Position</th>
              <th scope="col">Minutes</th>
              <th scope="col">Points</th>
              <th scope="col">FG</th>
              <th scope="col">FG(%)</th>
              <th scope="col">FT</th>
              <th scope="col">FT(%)</th>
              <th scope="col">TP</th>
              <th scope="col">TP(%)</th>
              <th scope="col">Reb</th>
              <th scope="col">offReb</th>
              <th scope="col">defReb</th>
              <th scope="col">Assists</th>
              <th scope="col">Fouls</th>
              <th scope="col">Steals</th>
              <th scope="col">Blocks</th>
              <th scope="col">Turnovers</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in teamStats" :key="item.id">
              <td>{{ item.stats.player.firstname }}</td>
              <td>{{ item.stats.player.lastname }}</td>
              <td>{{ item.stats.pos }}</td>
              <td>{{ item.stats.min }}</td>
              <td>{{ item.stats.points }}</td>
              <td>{{ item.stats.fgm }} / {{ item.stats.fga }}</td>
              <td>{{ item.stats.fgp }}</td>
              <td>{{ item.stats.ftm }} / {{ item.stats.fta }}</td>
              <td>{{ item.stats.ftp }}</td>
              <td>{{ item.stats.tpm }} / {{ item.stats.tpa }}</td>
              <td>{{ item.stats.tpp }}</td>
              <td>{{ item.stats.totReb }}</td>
              <td>{{ item.stats.offReb }}</td>
              <td>{{ item.stats.defReb }}</td>
              <td>{{ item.stats.assists }}</td>
              <td>{{ item.stats.pFouls }}</td>
              <td>{{ item.stats.steals }}</td>
              <td>{{ item.stats.blocks }}</td>
              <td>{{ item.stats.turnovers }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        gameStatistic: [],
      };
    },
    computed: {
      groupedGameStatistic() {
        return this.gameStatistic.reduce((acc, item) => {
          const teamName = item.stats.team.name;
          if (!acc[teamName]) {
            acc[teamName] = [];
          }
          acc[teamName].push(item);
          return acc;
        }, {});
      },
    },
    async created() {
      const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
        params: {
          game: this.$route.params.id,
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
          this.gameStatistic.push({ id: key, stats: value[key] });
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>
  