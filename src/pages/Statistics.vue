<template>
    <div class="container">
        <div class="col-md-12">
        <h3>Team Statistics</h3>
        <select v-model="selectedSeason" @change="statsData">
        <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
        </select>
        <select class="ms-5" v-model="selectedTeam" @change="onTeamChange">
        <option v-for="item in filteredTeamNameList" :value="item.teamID" :key="item.teamID">{{ item.team.name }}</option>
      </select>
      <hr>
      <h2 class="text-center"> <img id="logo" :src="selectedTeamInfo.team.logo" alt=""> {{ selectedTeamInfo.team.name }}</h2>
      <hr>
        <ul class="list-group">
            <li class="list-group-item" v-for="item in teamStatsData">
                Games Played : {{ item.games }} <hr>
                FB Points : {{ item.fastBreakPoints }} <hr>
                PointsPaint : {{ item.pointsInPaint }} <hr>
                SecondChance : {{ item.secondChancePoints }} <hr>
                TurnoverPoints : {{ item.pointsOffTurnovers }} <hr>
                PointsTotal : {{ item.points }} <hr>
                FG : {{ item.fgm }} / {{ item.fga }} <hr>
                FG(%) : {{ item.fgp }} <hr>
                FT : {{ item.ftm }} / {{ item.fta }} <hr>
                FT(%) : {{ item.ftp }} <hr>
                TP : {{ item.tpm }} / {{ item.tpa }} <hr>
                TP(%) : {{ item.tpp }} <hr>
                Rebonds : {{ item.totReb }} <hr>
                Offensive Rebonds : {{ item.offReb }} <hr>
                defensive Rebonds : {{ item.defReb }} <hr>
                Assists : {{ item.assists }} <hr>
                Fouls : {{ item.pFouls }} <hr>
                Steals : {{ item.steals }} <hr>
                Blocks : {{ item.blocks }} <hr>
                Turnovers : {{ item.turnovers }}
            </li>
        </ul>
    </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data(){
        return{
            teamStatsData:[],
            years: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            selectedSeason: '2021',
            teamNameList: [],
            selectedTeam: null, 
        }
    },
    async created(){
        this.teamName();
        
    },
    watch: {
      selectedSeason() {
        this.statsData();
      },
      selectedTeam() {
        this.statsData();
      },
    },
    computed: {
    filteredTeamNameList() {
      return this.teamNameList.filter(item => item.team.nbaFranchise && item.team.name !== "Home Team Stephen A");
    },
    selectedTeamInfo() {
      return this.teamNameList.find(item => item.teamID === this.selectedTeam) || {};
    }
    },
    methods:{
        async statsData(){
            const options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
            params: {
            id: this.selectedTeam,
            season: this.selectedSeason
        },
        headers: {
            'X-RapidAPI-Key': 'cfcfc30db1msh406ac436e949a0cp14c5bfjsn0fa2859d3766',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            let value = response.data.response;
            this.teamStatsData = value;
            
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
            this.teamNameList.push({ id: key, team: value[key], teamID: value[key].id, teamLogo: value[key].logo }); 
          }


          this.selectedTeam = this.teamNameList[0].teamID; // Set the default selectedTeam
        } catch (error) {
          console.error(error);
        }
      },
      onTeamChange() {
        // Update selectedTeam when team selection changes
        this.teamNameID = this.selectedTeam;
    }
    }

}
</script>

<style>
#logo{
    width: 70px;
    height: 70px;
}
</style>