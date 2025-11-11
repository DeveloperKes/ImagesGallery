import { Picture } from "@/interfaces/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface FavoritesProps {
  savedList: Picture[];
  addToList: (picture: Picture) => void;
  removeToList: (picture: Picture) => void;
  resetList: VoidFunction;
}

export const useFavoriteStore = create<FavoritesProps>()(
  persist(
    (set, get) => ({
      savedList: [],
      addToList: (picture: Picture) => {
        const current = get().savedList;
        const pictureIndex = current.findIndex((pic) => pic.id == picture.id);
        if (pictureIndex == -1) {
          current.push(picture);
          set({ savedList: current });
        }
      },
      removeToList: (picture: Picture) => {
        const current = get().savedList.filter((pic) => pic.id != picture.id);
        set({ savedList: current });
      },
      resetList: () => set({ savedList: [] }),
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
