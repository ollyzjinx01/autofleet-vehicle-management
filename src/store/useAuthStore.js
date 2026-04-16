import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  login: (email, password) => {
    if (email === "test@test.com" && password === "Test@1234") {
      set({ user: { email } });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null }),
}));
