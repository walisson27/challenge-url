<template>
  <div class="flex flex-row items-center justify-end gap-x-2 mb-12 relative">
    <select
      name="users"
      id="users"
      v-model="activeUser"
      @change="switchUser(activeUser)"
      class="px-2 py-1 text-base text-coolGray-600 appearance-none pr-12"
    >
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg
        width="26"
        height="15"
        viewBox="0 0 26 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 7.75C8.41406 7.75 10 6.19141 10 4.25C10 2.33594 8.41406 0.75 6.5 0.75C4.55859 0.75 3 2.33594 3 4.25C3 6.19141 4.55859 7.75 6.5 7.75ZM7.86719 9.0625H5.10547C2.48047 9.0625 0.375 11.1953 0.375 13.8203C0.375 14.3398 0.785156 14.75 1.30469 14.75H11.668C12.1875 14.75 12.625 14.3398 12.625 13.8203C12.625 11.1953 10.4922 9.0625 7.86719 9.0625Z"
          fill="#A0AEC0"
        />
        <path
          d="M25.6016 7.50391L22.1289 11.0039C21.9375 11.168 21.7188 11.25 21.5 11.25C21.2539 11.25 21.0352 11.168 20.8711 11.0039L17.3984 7.50391C17.125 7.25781 17.043 6.875 17.1797 6.54688C17.3164 6.21875 17.6445 6 18 6H24.9727C25.3281 6 25.6289 6.21875 25.7656 6.54688C25.9023 6.875 25.8477 7.25781 25.6016 7.50391Z"
          fill="#A0AEC0"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { useUsers } from "./hooks/useUsers";

export default {
  name: "UserSwitcher",

  setup() {
    const { users, activeUser, setActiveUser } = useUsers();

    const switchUser = (id) => {
      setActiveUser(id);
    };

    return {
      users,
      activeUser,
      setActiveUser,
      switchUser,
    };
  },
};
</script>

<style scoped></style>
