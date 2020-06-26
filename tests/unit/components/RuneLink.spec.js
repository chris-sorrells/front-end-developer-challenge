import { shallowMount } from "@vue/test-utils";
import RuneLink from "@/components/RuneLink.vue";

describe("RuneLink.vue", () => {
  it("renders when active", () => {
    const wrapper = shallowMount(RuneLink, { propsData: { active: true } });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders when not active", () => {
    const wrapper = shallowMount(RuneLink, { propsData: { active: false } });
    expect(wrapper.element).toMatchSnapshot();
  });
});
