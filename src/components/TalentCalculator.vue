<template>
  <div class="talent-calculator">
    <talent-calculator-header>
      TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
    </talent-calculator-header>

    <div class="talent-tree-wrapper">
      <div class="talent-tree-container">
        <div class="talent-tree">
          <div class="title">Talent Path 1</div>
          <talent-path :runes="runes[0]" />
        </div>

        <div class="talent-tree">
          <div class="title">Talent Path 2</div>
          <talent-path :runes="runes[1]" />
        </div>
      </div>

      <talent-points />
    </div>
  </div>
</template>

<script>
import TalentPath from "@/components/TalentPath.vue";
import TalentPoints from "@/components/TalentPoints.vue";
import TalentCalculatorHeader from "@/components/TalentCalculatorHeader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TalentPath,
    TalentPoints,
    TalentCalculatorHeader
  },

  computed: {
    ...mapGetters(["runes"])
  }
};
</script>

<style lang="scss">
.talent-calculator {
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin: auto;
  padding: 20px 20px 50px 20px;
  background: url("../assets/talent-calc-bg.png") repeat;

  .talent-tree-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .talent-tree-container {
      margin-right: 45px;

      @media (max-width: 950px) {
        display: flex;
        margin-right: 0;
      }

      .talent-tree {
        display: flex;
        margin-bottom: 45px;

        @media (max-width: 950px) {
          flex-direction: column;
          margin-bottom: 0;
          margin-right: 45px;

          &:last-child {
            margin-right: 0;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        .title {
          margin: auto 45px auto 0;
          text-transform: uppercase;
          font-size: 80%;
          font-weight: bold;

          @media (max-width: 950px) {
            margin-right: auto;
            margin-bottom: 15px;
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
