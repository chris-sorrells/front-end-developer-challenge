<template>
  <div class="talent-path">
    <div v-for="(rune, index) in runes" :key="rune.id" class="rune-container">
      <rune
        :type="rune.type"
        :active="rune.active"
        :toggleable="!runeByIdCanBeToggled(rune.id)"
        @activate="activate(rune.id)"
        @deactivate="deactivate(rune.id)"
      />

      <rune-link v-if="runes.length > index + 1" :active="rune.active" />
    </div>
  </div>
</template>

<script>
import Rune from "@/components/Rune.vue";
import RuneLink from "@/components/RuneLink.vue";
import Debug from "debug";
import { mapGetters } from "vuex";

const debug = Debug("front-end-developer-challenge:RuneContainer.vue");

export default {
  components: {
    Rune,
    RuneLink
  },

  props: {
    runes: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters(["runeByIdCanBeToggled"])
  },

  methods: {
    activate(id) {
      return this.$store.dispatch("activate", id).catch(error => {
        // Future improvements: you could launch a modal or a
        // notification to let the user know they can't do something.
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
.talent-path {
  display: flex;

  @media (max-width: 950px) {
    flex-direction: column;
  }

  .rune-container {
    display: flex;
    justify-items: center;
    align-items: center;

    @media (max-width: 950px) {
      flex-direction: column;
    }
  }
}
</style>
