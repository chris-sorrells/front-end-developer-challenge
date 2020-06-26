import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import TalentPath from "@/components/TalentPath.vue";
import Rune from "@/components/Rune.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TalentPath.vue", () => {
  let getters;
  let actions;
  let store;

  let runes = [
    { id: 1, type: "box", active: true, order: 1 },
    { id: 2, type: "skull", active: false, order: 2 }
  ];

  beforeEach(() => {
    getters = {
      runeByIdCanBeToggled: () => () => true
    };

    actions = {
      activate: jest.fn(),
      deactivate: jest.fn()
    };

    store = new Vuex.Store({
      getters,
      actions
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(TalentPath, {
      store,
      localVue,
      propsData: { runes }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("dispatches activate action when activating", () => {
    const wrapper = mount(TalentPath, {
      store,
      localVue,
      propsData: { runes }
    });

    wrapper.findComponent(Rune).vm.$emit("activate");
    expect(actions.activate).toBeCalled();
  });

  it("dispatches deactivate action when deactivating", () => {
    const wrapper = mount(TalentPath, {
      store,
      localVue,
      propsData: { runes }
    });

    wrapper.findComponent(Rune).vm.$emit("deactivate");
    expect(actions.deactivate).toBeCalled();
  });

  it("catches activation errors", () => {
    actions.activate = jest.fn().mockRejectedValue("foobar");

    store = new Vuex.Store({
      getters,
      actions
    });

    const wrapper = mount(TalentPath, {
      store,
      localVue,
      propsData: { runes }
    });

    wrapper.findComponent(Rune).vm.$emit("activate");
    expect(actions.activate).toBeCalled();
  });

  it("catches deactivation errors", () => {
    actions.deactivate = jest.fn().mockRejectedValue("foobar");

    store = new Vuex.Store({
      getters,
      actions
    });

    const wrapper = mount(TalentPath, {
      store,
      localVue,
      propsData: { runes }
    });

    wrapper.findComponent(Rune).vm.$emit("deactivate");
    expect(actions.deactivate).toBeCalled();
  });
});
