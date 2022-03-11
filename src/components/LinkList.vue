<template>
  <section class="mt-12">
    <h1 class="text-xl text-coolGray-50 mb-4">Encurtar URL</h1>

    <p
      v-if="shortenedLinks[activeUser]?.length === 0"
      class="text-center text-coolGray-50 text-lg font-regular mt-8"
    >
      Você ainda não encurtou nenhuma URL 
    </p>

    <div
      class="
        grid grid-cols-12
        gap-x-4 gap-y-2
        w-full
        px-4
        py-2
        border border-transparent
        hover:border-coolGray-200 hover:shadow-sm
        transition transition-colors transition-shadow
        duration-300
        rounded-xl
        group
      "
      v-for="link in shortenedLinks[activeUser]"
      :key="link.id"
    >
      <div class="col-span-5 text-sm self-center text-coolGray-50 font-light">
        {{ link.originalURL }}
      </div>

      <div class="col-span-5 text-sm self-center">
        <a
          :href="link.secureShortURL"
          target="_blank"
          class="
            text-sky-600
            underline
            flex flex-row
            justify-start
            items-center
            gap-x-1
          "
        >
          <span>{{ link.secureShortURL }}</span>
          <span
            class="
              opacity-0
              group-hover:opacity-100
              transition transition-opacity
              duration-500
            "
          >
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 6.5C7.14844 6.5 6.875 6.79297 6.875 7.125V9H1.25V3.375H3.125C3.45703 3.375 3.75 3.10156 3.75 2.75C3.75 2.41797 3.45703 2.125 3.125 2.125H1.25C0.546875 2.125 0 2.69141 0 3.375V9C0 9.70312 0.546875 10.25 1.25 10.25H6.875C7.55859 10.25 8.125 9.70312 8.125 9V7.125C8.125 6.79297 7.83203 6.5 7.5 6.5ZM9.80469 0.445312C9.6875 0.328125 9.53125 0.25 9.375 0.25H6.25C5.89844 0.25 5.625 0.542969 5.625 0.875C5.625 1.20703 5.91797 1.48047 6.25 1.48047H7.87109L3.47656 5.93359C3.24219 6.1875 3.24219 6.57812 3.47656 6.8125C3.73047 7.06641 4.12109 7.06641 4.375 6.8125L8.75 2.39844V4C8.75 4.35156 9.02344 4.625 9.35547 4.625C9.66797 4.625 10 4.35156 10 4V0.875C10 0.71875 9.92188 0.5625 9.80469 0.445312Z"
                fill="#4A5568"
              />
            </svg>
          </span>
        </a>
      </div>

      <div
        class="
          opacity-0
          group-hover:opacity-100
          transition transition-opacity
          duration-500
          col-span-2
          justify-self-end
          self-center
        "
      >
        <button
          @click="deleteStoredLink(link.id, activeUser)"
          class="p-2 bg-transparent hover:bg-red-100 rounded-lg"
        >
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.875 2.375H8.92969L8.13281 1.0625C7.92188 0.710938 7.57031 0.5 7.17188 0.5H4.80469C4.40625 0.5 4.05469 0.710938 3.84375 1.0625L3.04688 2.375H1.125C0.914062 2.375 0.75 2.5625 0.75 2.75V3.125C0.75 3.33594 0.914062 3.5 1.125 3.5H1.5V11C1.5 11.8438 2.15625 12.5 3 12.5H9C9.82031 12.5 10.5 11.8438 10.5 11V3.5H10.875C11.0625 3.5 11.25 3.33594 11.25 3.125V2.75C11.25 2.5625 11.0625 2.375 10.875 2.375ZM4.75781 1.69531C4.78125 1.67188 4.82812 1.625 4.89844 1.625H7.10156C7.14844 1.625 7.19531 1.67188 7.21875 1.69531L7.61719 2.375H4.35938L4.75781 1.69531ZM9 11.375H3C2.78906 11.375 2.625 11.2109 2.625 11V3.5H9.375V11C9.375 11.2109 9.1875 11.375 9 11.375ZM6 10.25C6.1875 10.25 6.375 10.0859 6.375 9.875V5C6.375 4.8125 6.1875 4.625 6 4.625C5.78906 4.625 5.625 4.8125 5.625 5V9.875C5.625 10.0859 5.78906 10.25 6 10.25ZM4.125 10.25C4.3125 10.25 4.5 10.0859 4.5 9.875V5C4.5 4.8125 4.3125 4.625 4.125 4.625C3.91406 4.625 3.75 4.8125 3.75 5V9.875C3.75 10.0859 3.91406 10.25 4.125 10.25ZM7.875 10.25C8.0625 10.25 8.25 10.0859 8.25 9.875V5C8.25 4.8125 8.0625 4.625 7.875 4.625C7.66406 4.625 7.5 4.8125 7.5 5V9.875C7.5 10.0859 7.66406 10.25 7.875 10.25Z"
              fill="#C53030"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useShortenedLinks } from "./hooks/useShortenedLinks";
import { useUsers } from "./hooks/useUsers";

export default {
  name: "LinkList",

  setup() {
    const { deleteStoredLink, shortenedLinks } = useShortenedLinks();
    const { activeUser } = useUsers();

    return {
      activeUser,
      shortenedLinks,
      deleteStoredLink,
    };
  },
};
</script>
