import { shallowMount } from "@vue/test-utils";
import TalentCalculatorHeader from "@/components/TalentCalculatorHeader.vue";

describe("TalentCalculatorHeader.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(TalentCalculatorHeader);
    expect(wrapper.element).toMatchSnapshot();
  });
});
