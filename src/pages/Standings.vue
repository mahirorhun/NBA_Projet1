<template>
  <div v-if="standings.length >0">
     
      <select  v-model="selectedSeason" @change="StandingsData">
      <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
  </select>
      
    <h1>Standings/ {{selectedSeason }}</h1>
    <!-- Eastern Conference Table -->
    <h2 v-if="loading" class="text-center">Loading...</h2>
    <h4 v-else>{{ standings.id }}</h4>
    <h2 v-else>Eastern Conference</h2>
    <table v-if="!loading && sortedEastStandings.length" class="table">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Team</th>
          <th scope="col">Win</th>
          <th scope="col">Lose</th>
          <th scope="col">Wins %</th>
          <th scope="col">Conf</th>
          <th scope="col">Div</th>
          <th scope="col">Home</th>
          <th scope="col">Away</th>
          <th scope="col">Last 10</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stads in sortedEastStandings" :key="stads.id">
          <th scope="row">{{ stads.conference.rank }}</th>
          <td>
            <img id="logo" :src="stads.team.logo" :alt="stads.team.code" />
            {{ stads.team.name }}
          </td>
          <td>{{ stads.win.home + stads.win.away }}</td>
          <td>{{ stads.loss.home + stads.loss.away }}</td>
          <td>{{ stads.win.percentage }}</td>
          <td>{{ stads.conference.win }} - {{ stads.conference.loss }}</td>
          <td>{{ stads.division.win }} - {{ stads.division.loss }}</td>
          <td>{{ stads.win.home }} - {{ stads.win.away }}</td>
          <td>{{ stads.loss.home }} - {{ stads.loss.away }}</td>
          <td>W-{{ stads.win.lastTen }} L-{{ stads.loss.lastTen }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Western Conference Table -->
    <h2 v-if="loading"></h2>
    <h2 v-else>Western Conference</h2>
    <table v-if="!loading && sortedWestStandings.length" class="table">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Team</th>
          <th scope="col">Win</th>
          <th scope="col">Lose</th>
          <th scope="col">Wins %</th>
          <th scope="col">Conf</th>
          <th scope="col">Div</th>
          <th scope="col">Home</th>
          <th scope="col">Away</th>
          <th scope="col">Last 10</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stads in sortedWestStandings" :key="stads.id">
          <th scope="row">{{ stads.conference.rank }}</th>
          <td>
            <img id="logo" :src="stads.team.logo" :alt="stads.team.code" />
            {{ stads.team.name }}
          </td>
          <td>{{ stads.win.home + stads.win.away }}</td>
          <td>{{ stads.loss.home + stads.loss.away }}</td>
          <td>{{ stads.win.percentage }}</td>
          <td>{{ stads.conference.win }} - {{ stads.conference.loss }}</td>
          <td>{{ stads.division.win }} - {{ stads.division.loss }}</td>
          <td>{{ stads.win.home }} - {{ stads.win.away }}</td>
          <td>{{ stads.loss.home }} - {{ stads.loss.away }}</td>
          <td>W-{{ stads.win.lastTen }} L-{{ stads.loss.lastTen }}</td>
        </tr>
      </tbody>
    </table>

    <div style="height: 200px;"></div>
  </div>

  <div v-else>
    <h1 class="text-center">Season / {{ this.$route.query.selectedYear }}</h1>
    <h3 class="text-center">{{ this.$route.query.selectedYear }} yılı için veri bulunamadı</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props:['selectedYear'],
  data() {
    return {
      standings: [{'season':'2021'}],
      loading: true,
      years: ['2018', '2019', '2020', '2021', '2022'],
      selectedSeason: '2021',
      
    };
  },
  async created() {
   if(this.$route.query.selectedYear != undefined) this.selectedSeason = this.$route.query.selectedYear;
  // Bileşen oluşturulduğunda durumları (standings) getir
  this.standingsData();
  },
  watch: {
      selectedSeason() {
      // Seçilen sezon değiştiğinde durumları (standings) tekrar getir
      this.standingsData();
      },
  },
  methods: {
      async standingsData() {
      this.loading = true;
      const options = {
          method: 'GET',
          url: 'https://api-nba-v1.p.rapidapi.com/standings',
          params: {
            league: 'standard',
            season: this.selectedSeason,
          },
          headers: {
          'X-RapidAPI-Key': 'cfcfc30db1msh406ac436e949a0cp14c5bfjsn0fa2859d3766',
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
          },
      };

      try {
          const response = await axios.request(options);
          let data = response.data;
          this.standings = []; // Önceki durumları temizler
          for (let key in data.response) {
          this.standings.push({ ...data.response[key], id: key });
          }
          this.loading = false;
      } catch (error) {
          console.error(error);
         
          this.loading = false;
      }
      },
  },
  computed: {
    sortedEastStandings() {
      // standings dizisini "east" conference'a göre filtreler ve rank'a göre sıralar
      return this.standings.filter((team) => team.conference.name === 'east').sort((a, b) => a.conference.rank - b.conference.rank);
    },
    sortedWestStandings() {
      // standings dizisini "west" conference'a göre filtreler ve rank'a göre sıralar
      return this.standings.filter((team) => team.conference.name === 'west').sort((a, b) => a.conference.rank - b.conference.rank);
    }
  }
};

</script>

<style>
#logo {
  height: 20px;
  width: 20px;
}
</style>

