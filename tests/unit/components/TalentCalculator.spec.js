import { shallowMount, createLocalVue } from "@vue/test-utils";
import TalentCalculator from "@/components/TalentCalculator.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TalentCalculator.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      runes: () => [
        [
          { id: 1, type: "box", active: true, order: 1 },
          { id: 2, type: "silverware", active: false, order: 2 }
        ],
        [
          { id: 3, type: "boat", active: true, order: 1 },
          { id: 4, type: "goggles", active: true, order: 2 }
        ]
      ]
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(TalentCalculator, {
      store,
      localVue
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
