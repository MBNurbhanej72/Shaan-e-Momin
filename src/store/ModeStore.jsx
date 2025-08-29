import { create } from "zustand";

export const useMode = create(set => ({
  mode: localStorage.getItem("Mode") || "light",

  changeMode: () => set(({ mode }) => {
    const changeMode = mode === "light" ? "dark" : "light";

    localStorage.setItem("Mode", changeMode);

    return { mode: changeMode };
  })
}));