<script lang="ts">
import { defineComponent } from 'vue';
import { IUserApiResponseData } from '../api/user/UserInterface';
import userApiService from '../api/user/UserService';
import Button from '../components/Button/index.vue';
import Swal from 'sweetalert2';

export default defineComponent({
  components: {
    Button,
  },
  data() {
    return {
      userData: [] as IUserApiResponseData[],
    };
  },
  async mounted() {
    const users = await userApiService.getAllUsers();

    this.userData = users.data;
  },
  methods: {
    handleNavigatePage(url: string) {
      this.$router.push(`/user${url}`);
    },
    async handleDeleteUser(id: string) {
      const user = await userApiService.deleteUser(id);

      if (user.statusCode === 200) {
        await Swal.fire({
          title: 'User Deleted!',
          text: 'Selected user has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        const users = await userApiService.getAllUsers();

        this.userData = users.data;
      } else {
        await Swal.fire({
          title: 'Delete Failed!',
          text: 'Selected user failed to be deleted.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
  },
});
</script>

<template>
  <main class="container mx-auto">
    <section class="px-20">
      <Button label="Add User" @click="() => handleNavigatePage('/add-user')" />
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
                    v-for="user in userData"
                    class="border-b border-neutral-200"
                  >
                    <td class="whitespace-nowrap px-6 py-4">{{ user.Name }}</td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ user.BirthDate }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ user.Phone }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ user.Address }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <div class="flex gap-3">
                        <button
                          @click="
                            () =>
                              handleNavigatePage(
                                `/${user.ID.toString()}/edit-user`,
                              )
                          "
                        >
                          Edit
                        </button>
                        <button
                          @click="() => handleDeleteUser(user.ID.toString())"
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
