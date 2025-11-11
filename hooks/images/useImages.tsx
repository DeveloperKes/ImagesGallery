import { apiFetch } from "@/services/api/images";
import { useHomePageStore } from "@/store/useHomePageStore";

export const useImages = () => {
  const { page, nextPage, addPictures, setIsLoading, isLoading } =
    useHomePageStore();
  const getMorePictures = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const endpoint = `list?page=${page}&limit=30`;

    try {
      const results = await apiFetch(endpoint);
      nextPage();
      addPictures(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    getMorePictures,
  };
};
