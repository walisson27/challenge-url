<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useShortenedLinks } from "./components/hooks/useShortenedLinks";
import { useUsers } from "./components/hooks/useUsers";
export default {
  name: `App`,

  setup() {
    const { getLocalShortenedLinks } = useShortenedLinks();
    const { users } = useUsers();

    onMounted(() => {
      getLocalShortenedLinks(users.value);
    });
  },
};
</script>

<style lang="scss">
body {
  background-image: linear-gradient(to right, #201d1d, #2b2d2f);
}
</style>
