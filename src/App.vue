<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <app-header></app-header>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: "App",
  components:{
    appHeader : Header,
  }
}
</script>

<style>

</style>
