<template>
  <main class="max-w-xl mx-auto py-8">
    <UserSwitcher />

    <Form />

    <div class="mt-2 h-4 flex flex-row justify-start items-center">
      <p v-if="error.length >= 1" class="text-base text-red-700">{{ error }}</p>
    </div>

    <LinkList />
  </main>
</template>

<script>
import { useShortenedLinks } from "../components/hooks/useShortenedLinks";
import Form from "../components/Form";
import UserSwitcher from "../components/UserSwitcher";
import LinkList from "../components/LinkList";

export default {
  name: `Home`,

  setup() {
    const { shortenedLinks, shortenedLink, error, deleteStoredLink } =
      useShortenedLinks();

    return {
      shortenedLink,
      deleteStoredLink,
      error,
      shortenedLinks,
    };
  },

  components: {
    LinkList,
    UserSwitcher,
    Form,
  },
};
</script>
