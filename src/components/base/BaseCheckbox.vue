<template>
  <div
    class="base-checkbox"
    :class="{'base-checkbox_checked': checked}"
  ></div>
</template>

<script>
export default {
  name: 'BaseCheckbox',

  props: {
    checked: Boolean
  }
}
</script>

<style lang="scss" scoped>
.base-checkbox {
  width: 1em;
  height: 1em;
  background-color: var(--base-color);
  display: inline-block;
  border-radius: 1px;

  &_checked {
    background-color: var(--second-color);
    border-color: var(--second-color);
    box-shadow: 0 0 3px var(--second-color);
  }
}
</style>
