import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      user_type: null,

      // 👉 Hydration flag
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      setAuthData: (data) =>
        set({
          user: data.user,
          token: data.token,
          user_type: data.user_type,
        }),

         updateUser: (updatedFields) =>
        set((state) => ({
          user: {
            ...state.user,
            ...updatedFields,
          },
        })),

      logout: () => {
        localStorage.removeItem("auth-storage");
        set({
          user: null,
          token: null,
          user_type: null,
        });
      },
    }),
    {
      name: "auth-storage",

      // 👉 This runs when Zustand rehydrates data from localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // mark when hydration is completed
      },
    }
  )
);
