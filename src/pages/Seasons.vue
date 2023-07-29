<template>
    <div>
        <hr>
        <h3 class="text-center">Seasons</h3>
        <hr>
        <ul class="list-group">
            <li class="list-group-item" 
            v-for="season in seasonList" 
            :key="season">
            
            Season : <strong>{{ season.year }}</strong>
            <router-link
                :to="{
                    name: 'YearDetails',
                    params: {
                    id: season.year
                    }
                }"><small class="ms-5">Click for details</small>
            </router-link>
            </li>            
        </ul>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            seasonList : []
        }
    },
async created(){
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/seasons',
        headers: {
        'X-RapidAPI-Key': 'cfcfc30db1msh406ac436e949a0cp14c5bfjsn0fa2859d3766',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        let value = response.data.response;
        for (let key in value) {
            this.seasonList.push({ id: key, year: value[key] });
        }
        
        
        
    } catch (error) {
        console.error(error);
    }
}
}

</script>