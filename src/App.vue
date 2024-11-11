<script setup lang="ts"></script>

<template>
  <nav class="bg-neutral-900 py-4 px-8 text-white">
    <ul class="flex">
      <li>
        <RouterLink to="/">Homepage</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView />
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
