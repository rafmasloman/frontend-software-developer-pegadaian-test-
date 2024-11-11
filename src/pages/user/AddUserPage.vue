<script lang="ts">
import { defineComponent } from 'vue';
import userApiService from '../../api/user/UserService';
import Swal from 'sweetalert2';

export default defineComponent({
  data() {
    return {
      Name: '',
      Address: '',
      Phone: '',
      BirthDate: new Date(),
    };
  },
  methods: {
    async submitUser(e: Event) {
      e.preventDefault();
      const user = await userApiService.createUser({
        Name: this.Name,
        Address: this.Address,
        BirthDate: this.BirthDate.toString(),
        Phone: this.Phone,
      });

      if (user.statusCode === 201) {
        await Swal.fire({
          title: 'User Created!',
          text: 'The user has been created.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        this.$router.go(-1);
      } else {
        await Swal.fire({
          title: 'Failed Create!',
          text: 'The user failed to create.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
  },
});
</script>

<template>
  <div class="container mx-auto px-20">
    <section>
      <h3>Halaman Tambah User</h3>
    </section>
    <section>
      <form class="mx-auto" method="post" @submit="submitUser">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-x-14">
          <div class="mb-5">
            <label
              for="name"
              id="name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nama</label
            >
            <input
              id="name"
              v-model="Name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Alamat</label
            >
            <input
              id="address"
              v-model="Address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-5">
            <label
              for="bithdate"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Tanggal Lahir</label
            >
            <input
              id="birthDate"
              type="date"
              v-model="BirthDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900"
              >No.Telp</label
            >
            <input
              id="phone"
              v-model="Phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </section>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  </div>
</template>
