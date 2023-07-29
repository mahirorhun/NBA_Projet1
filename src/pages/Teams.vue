<template>
    <div>
        <hr>
        <h3 class="text-center">NBA TEAMS</h3>
        <hr>
        <select v-model="selectedConference">
            <option value="all">All</option>
            <option v-for="conference in conferences" :value="conference" :key="conference">{{ conference }}</option>
        </select>
        <hr>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Logo</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">NBA ID</th>
                    <th scope="col">Nickname</th>
                    <th scope="col">Code</th>
                    <th scope="col">City</th>
                    <th scope="col">Conf</th>
                    <th scope="col">Div</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortedTeams" :key="item.teamID">
                    <th>
                        <img id="logo" :src="item.team.logo" :alt="item.team.code" />
                    </th>
                    <td>{{ item.team.name }}</td>
                    <td>{{ item.team.id }}</td>
                    <td>{{ item.team.nickname }}</td>
                    <td>{{ item.team.code }}</td>
                    <td>{{ item.team.city }}</td>
                    <td>{{ item.team.leagues.standard.conference }}</td>
                    <td>{{ item.team.leagues.standard.division }}</td>
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
            teamList: [],
            conferences: ['east', 'west'],
            selectedConference: 'all'
        }
    },
    watch: {
        selectedConference(newVal) {
            // Seçilen conference değiştiğinde durumları (conference) tekrar getir
            this.changeConf(newVal);
        },
    },
    computed: {
        sortedTeams() {
            let filteredTeams = this.teamList.filter(item => item.team.nbaFranchise && item.team.name !== "Home Team Stephen A");

            if (this.selectedConference === 'all') {
                // "All" seçeneği seçildiğinde, takımları NBA ID'lerine göre sırala
                return filteredTeams.sort((a, b) => a.team.id - b.team.id);
            } else {
                return filteredTeams;
            }
        }
    },
    async created() {
        // Bileşen oluşturulduğunda durumları (conference) getir
        this.changeConf(this.selectedConference);
    },
    methods: {
        async changeConf(conference) {
            this.teamList = []; // Eski verileri temizle

            if (conference === 'all') {
                // "All" seçeneği seçildiğinde, hem "east" hem de "west" takımlarını listeleyin
                await this.fetchTeams('east');
                await this.fetchTeams('west');
            } else {
                // "east" veya "west" seçeneği seçildiğinde sadece ilgili takımları listeleyin
                await this.fetchTeams(conference);
            }
        },
        async fetchTeams(conference) {
            const options = {
                method: 'GET',
                url: 'https://api-nba-v1.p.rapidapi.com/teams',
                params: {
                    conference: conference
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
                    this.teamList.push({ id: key, team: value[key], teamID: value[key].id })
                }
            } catch (error) {
                console.error(error);
            }
        }
    }  
}
</script>

<style>
#logo{
    width: 50px;
    height: 50px;
}
</style>