<template>
  <div class="rune-link" :class="{ active }">&nbsp;</div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss">
.rune-link {
  display: block;
  width: 100px;
  height: 15px;
  background: rgba(128, 128, 128, 0.15);
  transition: background-color 0.5s ease-out;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 950px) {
    height: 50px;
    width: 15px;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    border-right: 1px solid rgba(255, 255, 255, 0.15);
  }

  &.active {
    background: rgba(128, 128, 128, 0.5);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
}
</style>
