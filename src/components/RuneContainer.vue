<template>
  <div class="rune-container">
    <div class="rune-row">
      <rune
        v-for="rune in runes[0]"
        :key="rune.id"
        :type="rune.type"
        :active="rune.active"
        :toggleable="!runeByIdCanBeToggled(rune.id)"
        @activate="activate(rune.id)"
        @deactivate="deactivate(rune.id)"
      />
    </div>
    <div class="rune-row">
      <rune
        v-for="rune in runes[1]"
        :key="rune.id"
        :type="rune.type"
        :active="rune.active"
        :toggleable="!runeByIdCanBeToggled(rune.id)"
        @activate="activate(rune.id)"
        @deactivate="deactivate(rune.id)"
      />
    </div>

    <div>
      points spent:
      <span v-text="pointsUsed" />
      /
      <span v-text="pointsAllowed" />
    </div>
  </div>
</template>

<script>
import Rune from "@/components/Rune.vue";
import Debug from "debug";
import { mapGetters } from "vuex";

const debug = Debug("front-end-developer-challenge:RuneContainer.vue");

export default {
  components: {
    Rune
  },

  computed: {
    ...mapGetters([
      "runes",
      "pointsUsed",
      "pointsAllowed",
      "runeByIdCanBeToggled"
    ])
  },

  methods: {
    activate(id) {
      return this.$store.dispatch("activate", id).catch(error => {
        debug("Failed to activate rune.", error);
      });
    },

    deactivate(id) {
      return this.$store.dispatch("deactivate", id).catch(error => {
        debug("Failed to deactivate rune.", error);
      });
    }
  }
};
</script>

<style lang="scss">
.rune-container {
  .rune-row {
    display: flex;
  }
}
</style>
