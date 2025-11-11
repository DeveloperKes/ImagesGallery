import { Picture } from "@/interfaces/global";
import { create } from "zustand";

interface HomePageStore {
  page: number;
  nextPage: VoidFunction;
  resetPage: VoidFunction;

  gallery: Picture[];
  addPictures: (pictures: Picture[]) => void;
  clearGallery: VoidFunction;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const MAX_PAGE = 33;

export const useHomePageStore = create<HomePageStore>()((set, get) => ({
  page: Math.floor(Math.random() * MAX_PAGE) + 1,
  nextPage: () => set({ page: Math.floor(Math.random() * MAX_PAGE) + 1}),
  resetPage: () => set({ page: Math.floor(Math.random() * MAX_PAGE) + 1 }),
  gallery: [],
  addPictures: (pictures: Picture[]) => {
    const current = get().gallery;
    set({ gallery: current.concat(pictures) });
  },
  clearGallery: () => set({ gallery: [], page: Math.floor(Math.random() * MAX_PAGE) + 1 }),

  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
