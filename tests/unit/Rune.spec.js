import { shallowMount } from "@vue/test-utils";
import Rune from "@/components/Rune.vue";

describe("Rune.vue", () => {
  // TODO
  it("renders", () => {
    const wrapper = shallowMount(Rune);
    expect(wrapper.element).toMatchSnapshot();
  });
});
