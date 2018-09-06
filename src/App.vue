<template>
  <div id="app" v-loading.fullscreen.lock="loading">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  beforeCreate() {
    //do something before creating vue instance
    this.loading = true;
  },
  created() {
    //do something after creating vue instance
    this.loading = false;
  },
  mounted() {
    //do something after mounting vue instance
    document.body.removeChild(document.getElementById('loader-wrapper'));
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
