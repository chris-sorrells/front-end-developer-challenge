<template>
  <div id="app">
    <talent-calculator />
  </div>
</template>

<script>
import TalentCalculator from "@/components/TalentCalculator.vue";

export default {
  name: "App",
  components: {
    TalentCalculator
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  background-color: black;
  font-family: Open Sans;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12pt;
  height: 100vh;
  display: flex;
}
</style>
