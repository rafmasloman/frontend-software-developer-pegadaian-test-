<script lang="ts">
import { defineComponent } from 'vue';
import Swal from 'sweetalert2';
import TextInput from '../../components/Input/TextInput.vue';
import customerApiService from '../../api/user/CustomerService';

export default defineComponent({
  components: {
    TextInput,
  },
  data() {
    return {
      customerDetail: {
        Name: '',
        Phone: '',
        Address: '',
        BirthDate: '',
      },
    };
  },
  async mounted() {
    const customer = await customerApiService.getCustomerDetail(
      this.$route.params.id as string,
    );

    this.customerDetail = { ...customer.data };
  },
  methods: {
    async handleSubmitForm(e: Event) {
      e.preventDefault();
      const customer = await customerApiService.updateCustomer(
        this.$route.params.id as string,
        {
          Name: this.customerDetail.Name,
          Address: this.customerDetail.Address,
          BirthDate: this.customerDetail.BirthDate.toString(),
          Phone: this.customerDetail.Phone,
        },
      );

      if (customer.statusCode === 201) {
        await Swal.fire({
          title: 'Customer Updated!',
          text: 'The customer has been Updated.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        this.$router.go(-1);
      } else {
        await Swal.fire({
          title: 'Failed Update!',
          text: 'The customer failed to Update.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
  },
});
</script>

<template>
  <form
    class="mx-auto container px-20"
    method="post"
    @submit="handleSubmitForm"
  >
    <section class="grid grid-cols-1 md:grid-cols-2 gap-x-7">
      <TextInput label="Nama" name="Name" v-model="customerDetail.Name" />
      <TextInput
        label="Alamat"
        name="Address"
        v-model="customerDetail.Address"
      />
      <TextInput label="No.Telp" name="Phone" v-model="customerDetail.Phone" />

      <div class="mb-5">
        <label
          for="bithdate"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Tanggal Lahir</label
        >
        <input
          id="birthDate"
          type="date"
          v-model="customerDetail.BirthDate"
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
</template>
