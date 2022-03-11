import { reactive, toRefs } from "vue";

const LOCAL_STORAGE_KEY = `useShortenedLinks`;

const state = reactive({
  shortenedLinks: {},
  shortenedLink: ``,
  urlInput: ``,
  error: ``,
  loading: false,
});

export const useShortenedLinks = () => {
  const stringifyData = (data) => {
    return JSON.stringify(data);
  };

  const setError = (data) => {
    state.error = data;

    setTimeout(() => {
      state.error = ``;
    }, 5000);
  };

  const createLocalStorage = (users) => {
    if (window && !window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      state.shortenedLinks = {
        [users[0].id]: [],
        [users[1].id]: [],
      };

      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        stringifyData(state.shortenedLinks)
      );
    }
  };

  const getLocalShortenedLinks = (users) => {
    if (window && window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const localShortenedLinks = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      state.shortenedLinks = localShortenedLinks;
    } else {
      createLocalStorage(users);
    }
  };

  const setLocalShortenedLinks = (data) => {
    if (window && window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, stringifyData(data));
    }
  };

  const updateShortenedLinks = (data, userId) => {
    state.shortenedLinks[userId].unshift(data);
    setLocalShortenedLinks(state.shortenedLinks);
  };

  const storeLink = (data, userId) => {
    if (!storedLinksContainsDuplicate(data.originalURL, userId)) {
      const { id, secureShortURL, originalURL, createdAt } = data;

      const formattedShortenedLink = {
        id,
        userId,
        secureShortURL,
        originalURL,
        createdAt,
      };

      updateShortenedLinks(formattedShortenedLink, userId);
      state.urlInput = ``;
    } else {
      setError(`You already shortened this link!`);
    }
  };

  const deleteStoredLink = (id, userId) => {
    const indexToDelete = state.shortenedLinks[userId].findIndex(
      (link) => link.id === id
    );

    state.shortenedLinks[userId].splice(indexToDelete, 1);

    setLocalShortenedLinks(state.shortenedLinks);
  };

  const storedLinksContainsDuplicate = (originalURL, userId) => {
    const duplicates = state.shortenedLinks[userId].find(
      (shortenedLink) => shortenedLink.originalURL === originalURL
    );

    const duplicateExists = typeof duplicates !== `undefined`;

    return duplicateExists;
  };

  return {
    ...toRefs(state),
    setError,
    getLocalShortenedLinks,
    storeLink,
    deleteStoredLink,
  };
};
