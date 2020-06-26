import Debug from "debug";

const debug = Debug("front-end-developer-challenge:store:runes");

export const state = {
  pointsAllowed: 6,

  runes: [
    [
      { id: 1, type: "box", active: true, order: 1 },
      { id: 2, type: "silverware", active: false, order: 2 },
      { id: 3, type: "cake", active: false, order: 3 },
      { id: 4, type: "crown", active: false, order: 4 }
    ],
    [
      { id: 5, type: "boat", active: true, order: 1 },
      { id: 6, type: "goggles", active: true, order: 2 },
      { id: 7, type: "lightning", active: false, order: 3 },
      { id: 8, type: "skull", active: false, order: 4 }
    ]
  ]
};

export const getters = {
  /**
   * Return a list of rune sets.
   *
   * @param {Object} state
   * @returns {Object[][]}
   */
  runes: state => state.runes,

  /**
   * Returns a reference to a rune based on an ID.
   *
   * @param {Object} state
   * @returns {Object}
   */
  runeById: state => id => state.runes.flat().find(rune => rune.id === id),

  /**
   * Returns the maximum number of points which can be allocated in the rune calculator.
   *
   * @param {Object} state
   * @returns {Number}
   */
  pointsAllowed: state => state.pointsAllowed,

  /**
   * Returns the number of points allocated in the rune calculator.
   *
   * @param {Object} state
   * @returns {Number}
   */
  pointsUsed: state =>
    state.runes.flat().filter(rune => rune.active === true).length,

  /**
   * Determines if all preceding runes are active.
   * Used to determine if a rune can be activated.
   *
   * @param {Object} state
   * @returns {Function}
   */
  precedingRunesActiveFor(state) {
    /**
     * @param {Object} activatingRune - The rune which may become active.
     * @returns {Boolean}
     */
    return function(activatingRune) {
      // Search for runes which violate the business rules for selecting the current rune.
      // 1) Find the row which contains the selected rune.
      // 2) Include only runes listed before the current
      // 3) Include only runes which are inactive.
      // Of these runes, assert that the count is zero.
      return state.runes
        .find(row => row.filter(rune => rune.id === activatingRune.id).length)
        .filter(rune => rune.order < activatingRune.order)
        .filter(rune => rune.active === false).length === 0
        ? true
        : false;
    };
  },

  /**
   * Determines if all subsequent runes are inactive.
   * Used to determine if a rune can be deactivated.
   *
   * @param {Object} state
   * @returns {Function}
   */
  subsequentRunesInactiveFor(state) {
    /**
     * @param {Object} deactivatingRune - The rune which may become inactive.
     * @returns {Boolean}
     */
    return function(deactivatingRune) {
      // Search for runes which violate the business rules for selecting the current rune.
      // 1) Find the row which contains the selected rune.
      // 2) Include only runes listed after the current
      // 3) Include only runes which are active.
      // Of these runes, assert that the count is zero.
      return (
        state.runes
          .find(
            row => row.filter(rune => rune.id === deactivatingRune.id).length
          )
          .filter(rune => rune.order > deactivatingRune.order)
          .filter(rune => rune.active === true).length === 0
      );
    };
  },

  /**
   * Determines if the rune can be toggled.
   *
   * @param {Object} state
   * @param {Object} getters
   * @returns {Boolean} True if it can be toggled; false if a business rule is preventing it.
   */
  runeByIdCanBeToggled(state, getters) {
    return function(id) {
      const rune = getters.runeById(id);

      if (rune.active) {
        return getters.subsequentRunesInactiveFor(rune);
      } else {
        return (
          getters.precedingRunesActiveFor(rune) &&
          getters.pointsUsed < getters.pointsAllowed
        );
      }
    };
  }
};

export const actions = {
  /**
   * Attempts to activate a rune.  Will reject if it is not allowed to be activated.
   *
   * @throws {TooManyPointsUsed} - The used points must not exceed available points.
   * @throws {RuneAlreadyActive} - The rune must not already be active.
   * @throws {PrecedingRunesMustBeActive} - The preceding runes must be active.
   * @param {Object} state
   * @param {Function} state.commit
   * @param {Function} state.getters
   * @param {Number} id - The ID of a rune to activate.
   */
  activate({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      // Refuse to activate if the user has already used up their points.
      if (getters.pointsUsed >= getters.pointsAllowed) {
        return reject("TooManyPointsUsed");
      }

      const rune = getters.runeById(id);

      // Refuse to activate if the user has already activated the rune.
      if (rune.active === true) {
        return reject("RuneAlreadyActive");
      }

      // Refuse to activate if the preceding runes are not all already
      // activated.
      if (!getters.precedingRunesActiveFor(rune)) {
        return reject("PrecedingRunesMustBeActive");
      }

      // Activate the rune.
      debug("Activating rune.", rune);
      commit("activate", rune);
      resolve(rune);
    });
  },

  /**
   * Attempts to activate a rune.  Will reejct if it is not allowed to be deactivated.
   *
   * @throws {SubsequentRunesMustBeInactive} - Following runes must be inactive.
   * @throws {RuneAlreadyInactive} - The run must be currently active.
   * @param {Object} state
   * @param {Function} state.commit
   * @param {Function} state.getters
   * @param {Number} id - The ID of a rune to activate.
   */
  deactivate({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      const rune = getters.runeById(id);

      // Refuse to activate if subsequent runes are not yet inactive.
      if (!getters.subsequentRunesInactiveFor(rune)) {
        return reject("SubsequentRunesMustBeInactive");
      }

      // Refuse to deactivate if the rune is already inactive.
      if (rune.active === false) {
        return reject("RuneAlreadyInactive");
      }

      // Deactivate the rune.
      debug("Deactivating rune.", rune);
      commit("deactivate", getters.runeById(id));
      resolve(rune);
    });
  }
};

export const mutations = {
  /**
   * Set the state of the rune to be active.
   *
   * @param {Object} state
   * @param {Object} rune
   */
  activate(state, rune) {
    rune.active = true;
  },

  /**
   * Set the state of the rune to be inactive.
   *
   * @param {Object} state
   * @param {Object} rune
   */
  deactivate(state, rune) {
    rune.active = false;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
