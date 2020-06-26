<template>
  <div class="rune-wrapper" :class="{ active }">
    <a
      class="rune"
      :class="[{ active }, { toggleable }, `is-${type}`]"
      @contextmenu.prevent
      @click.left="$emit('activate')"
      @click.right="$emit('deactivate')"
    />
  </div>
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
.rune-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border: 1px solid #999;
  box-shadow: 0 0 3px 3px rgba(128, 128, 128, 0.25);

  background-image: linear-gradient(
    0deg,
    #6c6c6c,
    #393939 50%,
    #6c6c6c 0,
    #6c6c6c
  );

  &.active {
    background-image: linear-gradient(
      0deg,
      #8fc1f3,
      #243a50 50%,
      #8fc1f3 0,
      #8fc1f3
    );
  }

  .rune {
    display: block;
    background: url("../assets/talent-icons-sprite.png") no-repeat;
    width: 50px;
    height: 50px;
    cursor: pointer;

    &.is-box {
      background-position: 0 -50px;
      &.active,
      &:hover {
        background-position: 0 0;
      }
    }
    &.is-silverware {
      background-position: -50px -50px;
      &.active,
      &:hover {
        background-position: -50px 0;
      }
    }
    &.is-cake {
      background-position: -100px -50px;
      &.active,
      &:hover {
        background-position: -100px 0;
      }
    }
    &.is-crown {
      background-position: -150px -50px;
      &.active,
      &:hover {
        background-position: -150px 0;
      }
    }
    &.is-boat {
      background-position: -200px -50px;
      &.active,
      &:hover {
        background-position: -200px 0;
      }
    }
    &.is-goggles {
      background-position: -250px -50px;
      &.active,
      &:hover {
        background-position: -250px 0;
      }
    }
    &.is-lightning {
      background-position: -300px -50px;
      &.active,
      &:hover {
        background-position: -300px 0;
      }
    }
    &.is-skull {
      background-position: -350px -50px;
      &.active,
      &:hover {
        background-position: -350px 0;
      }
    }
  }
}
</style>
