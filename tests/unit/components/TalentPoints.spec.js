import { shallowMount, createLocalVue } from "@vue/test-utils";
import TalentPoints from "@/components/TalentPoints.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TalentPoints.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      pointsUsed: () => 3,
      pointsAllowed: () => 6
    };

    store = new Vuex.Store({
      getters
    });
  });
  it("renders", () => {
    const wrapper = shallowMount(TalentPoints, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });
});
