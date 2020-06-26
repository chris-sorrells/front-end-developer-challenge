<template>
  <div class="talent-points">
    <div>
      <span class="used" v-text="pointsUsed" />&nbsp;/&nbsp;
      <span class="allowed" v-text="pointsAllowed" />
    </div>
    <div class="label">Points Spent</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["pointsUsed", "pointsAllowed"])
  }
};
</script>

<style lang="scss">
.talent-points {
  text-align: center;
  font-size: 125%;
  margin: auto 0;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.6);

  @media (max-width: 950px) {
    order: -1;
    flex: 1 0 85%;
    margin-bottom: 25px;
  }

  .label {
    color: rgb(100, 150, 200);
  }
}
</style>
