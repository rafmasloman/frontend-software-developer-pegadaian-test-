<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: false,
    },
  },
};
</script>

<template>
  <button
    :class="`w-fit ${
      variant === 'secondary' ? 'bg-white' : 'bg-green-600'
    } text-white p-2.5 rounded-lg`"
  >
    {{ label }}
  </button>
</template>
