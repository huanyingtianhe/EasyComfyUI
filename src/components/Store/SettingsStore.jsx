import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

export const useSettingsStore = create(
    persist(
      (set) => ({
        comfyUIAddress: null,
        setComfyUIAddress: (address) => set((state) => ({ comfyUIAddress: address })),
      }),
      {
        name: 'ComfyUIAddress-storage', // unique name
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )