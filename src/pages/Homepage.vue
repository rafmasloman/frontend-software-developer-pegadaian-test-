<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/index.vue';
import Swal from 'sweetalert2';
import { ICustomerApiResponseData } from '../api/user/CustomerInterface';
import customerApiService from '../api/user/CustomerService';

export default defineComponent({
  components: {
    Button,
  },
  data() {
    return {
      customersData: [] as ICustomerApiResponseData[],
    };
  },
  async mounted() {
    const customers = await customerApiService.getAllCustomers();

    this.customersData = customers.data;
  },
  methods: {
    handleNavigatePage(url: string) {
      this.$router.push(`/customer${url}`);
    },
    async handleDeleteUser(id: string) {
      const customer = await customerApiService.deleteCustomer(id);

      if (customer.statusCode === 200) {
        await Swal.fire({
          title: 'Customer Deleted!',
          text: 'Selected Customer has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        const customers = await customerApiService.getAllCustomers();

        this.customersData = customers.data;
      } else {
        await Swal.fire({
          title: 'Delete Failed!',
          text: 'Selected Customer failed to be deleted.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
  },
});
</script>

<template>
  <main class="container mx-auto py-10 font-poppins">
    <section class="px-7 md:px-10 lg:px-20">
      <h1>Homepage</h1>
    </section>

    <div class="my-10"></div>

    <section class="px-7 md:px-10 lg:px-20">
      <div class="flex flex-col" jus>
        <Button
          label="Add User"
          @click="() => handleNavigatePage('/add-customer')"
        />
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table
                class="min-w-full text-left text-sm font-light text-surface"
              >
                <thead class="border-b border-neutral-200 font-medium">
                  <tr>
                    <th scope="col" class="px-6 py-4">Name</th>
                    <th scope="col" class="px-6 py-4">Birth Date</th>
                    <th scope="col" class="px-6 py-4">Phone Number</th>
                    <th scope="col" class="px-6 py-4">Address</th>
                    <th scope="col" class="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="customer in customersData"
                    class="border-b border-neutral-200"
                  >
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ customer.Name }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ customer.BirthDate }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ customer.Phone }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ customer.Address }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <div class="flex gap-3">
                        <button
                          class="bg-blue-300 px-3 py-2 rounded-lg"
                          @click="
                            () =>
                              handleNavigatePage(
                                `/${customer.ID.toString()}/edit-customer`,
                              )
                          "
                        >
                          Edit
                        </button>
                        <button
                          class="bg-red-300 px-3 py-2 rounded-lg"
                          @click="
                            () => handleDeleteUser(customer.ID.toString())
                          "
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
