<template>
  <div class="talent-calculator-header">
    <slot />
  </div>
</template>

<style lang="scss">
.talent-calculator-header {
  display: block;
  margin-bottom: 50px;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  font-size: 130%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: rgba(128, 128, 128, 0.25);

  @media (max-width: 950px) {
    margin-bottom: 25px;
  }
}
</style>
