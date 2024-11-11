<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(event: Event) {
      const input = event.target as HTMLInputElement;
      this.$emit('update:modelValue', input.value);
    },
  },
};
</script>

<template>
  <div class="mb-5">
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
    <input
      :placeholder="placeholder"
      :id="name"
      type="date"
      :value="modelValue"
      @input="updateValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>
</template>
