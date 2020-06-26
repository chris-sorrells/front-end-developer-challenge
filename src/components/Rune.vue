<template>
  <a
    class="rune"
    :class="[{ active }, { toggleable }, `is-${type}`]"
    @contextmenu.prevent
    @click.left="$emit('activate')"
    @click.right="$emit('deactivate')"
  />
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },

    toggleable: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      required: true,
      validator(value) {
        return [
          "box",
          "silverware",
          "cake",
          "crown",
          "boat",
          "goggles",
          "lightning",
          "skull"
        ].includes(value);
      }
    }
  }
};
</script>

<style lang="scss">
.rune {
  display: block;
  background: url("../assets/talent-icons-sprite.png") no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;

  // &.toggleable {
  //   cursor: default;
  // }

  &.is-box {
    background-position: 0 -50px;
    &.active {
      background-position: 0 0;
    }
  }
  &.is-silverware {
    background-position: -50px -50px;
    &.active {
      background-position: -50px 0;
    }
  }
  &.is-cake {
    background-position: -100px -50px;
    &.active {
      background-position: -100px 0;
    }
  }
  &.is-crown {
    background-position: -150px -50px;
    &.active {
      background-position: -150px 0;
    }
  }
  &.is-boat {
    background-position: -200px -50px;
    &.active {
      background-position: -200px 0;
    }
  }
  &.is-goggles {
    background-position: -250px -50px;
    &.active {
      background-position: -250px 0;
    }
  }
  &.is-lightning {
    background-position: -300px -50px;
    &.active {
      background-position: -300px 0;
    }
  }
  &.is-skull {
    background-position: -350px -50px;
    &.active {
      background-position: -350px 0;
    }
  }
}
</style>
