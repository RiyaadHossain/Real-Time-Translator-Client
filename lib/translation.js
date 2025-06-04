import api from "./api";

export const history = async () => {
  try {
    const res = await api.get("/translation/history");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return {
      message: error?.response?.data?.message || "Failed to fetch history",
    };
  }
};

export const storeTranslation = async ({ fromLang, toLang }) => {
  try {
    const res = await api.post("/translation/store-translation", { fromLang, toLang });
    return res.data;
  } catch (error) {
    console.error("Failed to store translation:", error);
    return {
      message: error?.response?.data?.message || "Failed to store translation",
    };
  }
};
