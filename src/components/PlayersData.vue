<template>
    <div>
        <select v-model="selectedSeason" @change="playerData">
        <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
      </select>
      <select class="ms-5" v-model="selectedTeam" @change="onTeamChange">
        <option v-for="item in filteredTeamNameList" :value="item.teamID" :key="item.teamID">{{ item.team.name }}</option>
      </select>
      <hr>
  
      <table class="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Jersey No</th>
            <th scope="col">Position</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Country</th>
            <th scope="col">Height(m)</th>
            <th scope="col">Weight(kg)</th>
            <th scope="col">College</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedPlayers" :key="item.id">
            <td scope="col">{{ item.firstname }}</td>
            <td scope="col">{{ item.lastname }}</td>
            <td scope="col">{{ item.leagues.standard?.jersey}}</td>
            <td scope="col">{{ item.leagues.standard?.pos }}</td>
            <td scope="col">{{ item.birth.date }}</td>
            <td scope="col">{{ item.birth.country }}</td>
            <td scope="col">{{ item.height.meters }}</td>
            <td scope="col">{{ item.weight.kilograms }}</td>
            <td scope="col">{{ item.college }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        playersList: [],
        years: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        selectedSeason: '2021',
        teamNameList: [],
        selectedTeam: null, 
      };
    },
    computed: {
      sortedPlayers() {
        return this.playersList.filter(item => item.leagues.standard?.active === true);
      },
      filteredTeamNameList() {
      // Filter teamNameList to include only teams with nbaFranchise set to true
      return this.teamNameList.filter(item => item.team.nbaFranchise && item.team.name !== "Home Team Stephen A");
    }
    },
    async created() {
      this.teamName();
    },
    watch: {
      selectedSeason() {
        this.playerData();
      },
      selectedTeam() {
        this.playerData();
      },
    },
    methods: {
      async playerData() {
        this.playersList = [];
  
        const options = {
          method: 'GET',
          url: 'https://api-nba-v1.p.rapidapi.com/players',
          params: {
            team: this.selectedTeam,
            season: this.selectedSeason,
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
            this.playersList.push({ ...value[key], id: key, playerID: value[key].id });
          }
        } catch (error) {
          console.error(error);
        }
      },
      async teamName() {
        const options = {
          method: 'GET',
          url: 'https://api-nba-v1.p.rapidapi.com/teams',
          headers: {
            'X-RapidAPI-Key': 'cfcfc30db1msh406ac436e949a0cp14c5bfjsn0fa2859d3766',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
          }
        };
  
        try {
          const response = await axios.request(options);
          let value = response.data.response; 
          for (let key in value) {
            this.teamNameList.push({ id: key, team: value[key], teamID: value[key].id });
          }
          this.selectedTeam = this.teamNameList[0].teamID; // Set the default selectedTeam
        } catch (error) {
          console.error(error);
        }
      },
      onTeamChange() {
        // Update selectedTeam when team selection changes
        this.teamNameID = this.selectedTeam;
      },
    },
  };
  </script>
  