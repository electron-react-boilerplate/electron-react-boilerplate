import create from "zustand";

// TODO: UPDATE FOR INDIGO DESKTOP APP
const useGlobalState = create((set) => ({
  availableCommands: [],
  setAvailableCommands: (availableCommands) => {
    set(() => ({ availableCommands }));
  },

  selectedCommandIndex: null,
  setSelectedCommandIndex: (selectedCommandIndex) => {
    set(() => ({ selectedCommandIndex }));
  },

  // APP UI STATE
  currentScreen: "SEARCH_SCREEN",
  setCurrentScreen: (currentScreen) => {
    set(() => ({ currentScreen }));
  },

  globalLoading: false,
  setGlobalLoading: (globalLoading) => {
    set(() => ({ globalLoading }));
  },
}));

export default useGlobalState;
