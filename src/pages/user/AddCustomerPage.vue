<script lang="ts">
import { defineComponent } from 'vue';
import Swal from 'sweetalert2';
import TextInput from '../../components/Input/TextInput.vue';
import DateInput from '../../components/Input/DateInput.vue';
import customerApiService from '../../api/user/CustomerService';

export default defineComponent({
  components: {
    TextInput,
    DateInput,
  },
  data() {
    return {
      Name: '',
      Address: '',
      Phone: '',
      BirthDate: new Date(),
    };
  },
  methods: {
    async submitCustomer(e: Event) {
      e.preventDefault();

      console.log('data : ', {
        Name: this.Name,
        Address: this.Address,
        BirthDate: this.BirthDate,
        Phone: this.Phone,
      });

      const customer = await customerApiService.createCustomer({
        Name: this.Name,
        Address: this.Address,
        BirthDate: this.BirthDate,
        Phone: this.Phone,
      });

      if (customer.statusCode === 201) {
        await Swal.fire({
          title: 'Customer Created!',
          text: 'The customer has been created.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        this.$router.go(-1);
      } else {
        await Swal.fire({
          title: 'Failed Create!',
          text: 'The customer failed to create.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
  },
});
</script>

<template>
  <div class="container mx-auto px-20 font-poppins py-10">
    <section>
      <h1 class="text-xl font-semibold">Halaman Tambah Customer</h1>
    </section>

    <div class="my-10"></div>
    <section>
      <form class="mx-auto" method="post" @submit="submitCustomer">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-x-14">
          <TextInput
            placeholder="Masukkan Nama"
            label="Nama"
            name="Name"
            v-model="Name"
          />
          <TextInput
            placeholder="Masukkan Alamat"
            label="Alamat"
            name="Address"
            v-model="Address"
          />
          <TextInput
            placeholder="Masukkan Nomor"
            label="No.Telp/WA"
            name="Phone"
            v-model="Phone"
          />

          <!-- <DateInput
            placeholder="Pilih Tanggal Lahir"
            label="Tanggal Lahir"
            name="BirthDate"
            v-model="BirthDate"
          /> -->

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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
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
