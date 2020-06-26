import { shallowMount } from "@vue/test-utils";
import Rune from "@/components/Rune.vue";

describe("Rune.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Rune, {
      propsData: { active: false, toggleable: false, type: "box" }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
