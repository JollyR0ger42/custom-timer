<template>
  <div>
    <img
      v-if="status"
      src="@/svg/visibility_on.svg"
    />
    <img
      v-if="!status"
      src="@/svg/visibility_off.svg"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseVisibilityIcon',

  props: {
    status: Boolean
  }
}
</script>