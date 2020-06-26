import { getters } from "@/store/runes";

describe("runes.js getters", () => {
  const state = {
    pointsAllowed: 6,
    runes: [
      [
        { id: 1, type: "foo", active: true, order: 1 },
        { id: 2, type: "bar", active: true, order: 2 },
        { id: 3, type: "foobar", active: false, order: 3 },
        { id: 4, type: "barfoo", active: false, order: 4 }
      ]
    ]
  };

  test("runes", () => {
    expect(getters.runes(state)).toEqual(state.runes);
  });

  test("runeById", () => {
    expect(getters.runeById(state)(2)).toEqual(state.runes[0][1]);
  });

  test("pointsAllowed", () => {
    expect(getters.pointsAllowed(state)).toEqual(state.pointsAllowed);
  });

  test("pointsUsed", () => {
    expect(getters.pointsUsed(state)).toEqual(2);
  });

  test("precedingRunesActiveFor - true case", () => {
    expect(getters.precedingRunesActiveFor(state)(state.runes[0][2])).toEqual(
      true
    );
  });

  test("precedingRunesActiveFor - false case", () => {
    expect(getters.precedingRunesActiveFor(state)(state.runes[0][3])).toEqual(
      false
    );
  });

  test("subsequentRunesInactiveFor - true case", () => {
    expect(
      getters.subsequentRunesInactiveFor(state)(state.runes[0][1])
    ).toEqual(true);
  });

  test("subsequentRunesInactiveFor - false case", () => {
    expect(
      getters.subsequentRunesInactiveFor(state)(state.runes[0][0])
    ).toEqual(false);
  });
});
