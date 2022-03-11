<template>
  <form @submit.prevent="shortenUrl" id="UrlInputForm">
    <section class="flex flex-col items-start justify-start gap-y-1">
      <label
        for="UrlInput"
        class="text-sm uppercase font-bold text-coolGray-50"
        >Insira uma URL</label
      >

      <div class="grid grid-cols-12 gap-x-1 w-full">
        <input
          v-model="urlInput"
          type="text"
          name="UrlInput"
          id="UrlInput"
          placeholder="https://google.com"
          class="
            col-span-8
            border border-coolGray-400
            px-2
            py-1
            text-base
            rounded-lg
            placeholder-coolGray-400
          "
          tabindex="1"
          autofocus
        />
        <button
          type="submit"
          class="
            col-span-4
            bg-blue-300
            text-white-900
            border border-black-500 border-dotted
            hover:bg-pink-200 hover:border-white-400
            focus:bg-pink-200 focus:border-white-400
            px-4
            py-1
            text-base
            rounded-lg
          "
          tabindex="2"
        >
          Shorten!
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import axios from "axios";
import { useUsers } from "./hooks/useUsers";
import { useShortenedLinks } from "./hooks/useShortenedLinks";

export default {
  name: `Form`,

  setup() {
    const { activeUser } = useUsers();
    const { storeLink, setError, urlInput } = useShortenedLinks();

    const getShortenedUrl = async () => {
      setError(``);

      const shortenerResponse = await axios
        .post(
          `https://api.short.io/links/public`,
          {
            domain: `1g3n.short.gy`,
            originalURL: urlInput.value,
          },
          {
            headers: {
              Authorization: `XN7nymwHbvmK34N5KUsEseB3GapaIKlm`,
              Accept: `application/json`,
              "Content-Type": `application/json`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          const errorResponse = e.response.data.error;

          if (errorResponse) {
            setError(errorResponse);
          }
        });

      return shortenerResponse;
    };

    const shortenUrl = async () => {
      const data = await getShortenedUrl().then((res) => res);

      storeLink(data, activeUser.value);
    };

    return {
      urlInput,
      shortenUrl,
    };
  },

  methods: {},
};
</script>
