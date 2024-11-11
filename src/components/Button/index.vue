<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <button class="bg-indigo-700 text-white p-2.5 rounded-lg">
    {{ label }}
  </button>
</template>
