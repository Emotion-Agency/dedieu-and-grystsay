<script setup lang="ts"></script>

<template>
  <section class="s-ticker">
    <div class="s-ticker__wrapper">
      <div class="s-ticker__line" />
      <p class="s-ticker__text">
        <slot />
      </p>
      <div class="s-ticker__line" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-ticker__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);
}

.s-ticker__text {
  @include medium;
  margin: vw(36) 0;
  font-size: vw(100);
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: size(100, 50);
    margin: 18px 0;
  }

  @media (max-width: $br4) {
    font-size: 50px;
  }
}
</style>
