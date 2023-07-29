import { createRouter, createWebHistory } from "vue-router";
import Games from './pages/Games.vue';
import Players from './pages/Players.vue';
import Seasons from './pages/Seasons.vue';
import Standings from './pages/Standings.vue';
import Statistics from './pages/Statistics.vue';
import Teams from './pages/Teams.vue';
import Home from './components/Home.vue';



export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/standings',
      name: 'standings',
      component: Standings
    },
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/players',
      name: 'players',
      component: Players
    },
    {
      path: '/seasons',
      name: 'seasons',
      component: Seasons
    },
    {
      path: '/seasons/:id',
      name: 'YearDetails',
      component: () => import('./components/YearDetails.vue'),
      props:true
    },
    {
      path: '/seasons/:id/standigs',
      name: 'Standigns',
      component: Standings,
      props:true
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    },
    {
      path: '/games/:id',
      name: 'GameDetails',
      component: () => import('./components/GameDetails.vue'),
      props:true
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
 
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

