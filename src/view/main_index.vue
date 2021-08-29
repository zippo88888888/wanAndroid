<template>
  <div id="main_index">
    <router-view></router-view>
    <keep-alive>
      <BNView/>
    </keep-alive>
  </div>
</template>

<script>
import BNView from '../components/BNView'
export default {
  name: 'main_index',
  components: {BNView}
}
</script>

<style scoped>
  #main_index {
  }
</style>
