import { reactive, toRefs } from "vue";

const state = reactive({
  users: [
    {
      id: `bafb4679-e230-45ca-a4a9-2303a1470e99`,
      name: `Usuario 1`,
    },
    {
      id: `b7a4cfe0-9e4b-44fc-95d7-76b1950327d1`,
      name: `Usuario 2`,
    },
  ],

  activeUser: `bafb4679-e230-45ca-a4a9-2303a1470e99`,
});

export const useUsers = () => {
  const setActiveUser = (id) => {
    state.activeUser = id;
  };

  return {
    ...toRefs(state),
    setActiveUser,
  };
};
