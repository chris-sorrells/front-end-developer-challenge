/* istanbul ignore file */
import Vue from "vue";
import Vuex from "vuex";

import runes from "@/store/runes";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    runes
  }
});
